import io
import json
import base64
import markdown
from pypdf import PdfReader, PdfWriter
from fastapi.responses import StreamingResponse
from fastapi import UploadFile, HTTPException, status
from fastapi import UploadFile
from PIL import Image
from typing import Optional
from fastapi import UploadFile
from playwright.async_api import async_playwright
from jinja2 import Template


async def merge_pdf_files(uploaded_files) -> io.BytesIO:
    
    merger = PdfWriter()
    
    for file in uploaded_files:
        
        merger.append(file.file)
        
    output_stream = io.BytesIO()
    
    merger.write(output_stream)
    merger.close()
    
    output_stream.seek(0)
    
    return output_stream

async def convert_image_to_pdf(Uploaded_files: list[UploadFile]) -> io.BytesIO:
    image_list = []
    
    for file in Uploaded_files:
        file_bytes = file.file.read()
        
        img = Image.open(io.BytesIO(file_bytes)) 
        
        if img.mode in ("RGB", "LA") or (img.mode == "P" and "trasparency" in img.info):
            
            background = Image.new("RGB", img.size, (255,255,255))
            
            background.paste(img, mask=img.convert("RGBA").split()[3])
            
            img = background
        else:
            img = img.convert("RGB")
            
        image_list.append(img)
        
    if not image_list:
        raise ValueError("Nenhuma imagem válida foi processada.")
    
    
    output_stream = io.BytesIO()
    
    first_image = image_list[0]
    rest_of_images = image_list[1:]
    
    first_image.save(
        output_stream,
        format="PDF",
        save_all=True,
        append_images=rest_of_images
    )
    
    output_stream.seek(0)
    
    return output_stream

async def convert_pages_to_pdf(Uploaded_files: UploadFile, pages: str):
    
    if not Uploaded_files.filename.endswith('.pdf'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="O arquivo enviado deve ser um PDF válido."
        )

    try:
        pages_to_keep = json.loads(pages)  

        
        file_bytes = await Uploaded_files.read()
        pdf_reader = PdfReader(io.BytesIO(file_bytes))
        pdf_writer = PdfWriter()

        total_pages = len(pdf_reader.pages)

        
        for page_num in pages_to_keep:
            index = page_num - 1
            
            if 0 <= index < total_pages:
                pdf_writer.add_page(pdf_reader.pages[index])
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"A página {page_num} não existe no documento original."
                )

        output_stream = io.BytesIO()
        pdf_writer.write(output_stream)
        output_stream.seek(0)  
    
        return output_stream
    
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="O parâmetro 'pages' deve ser um array JSON válido."
        )
    
    
    
THEME_PALETTES = {
    "modern": {
        "primary": "#1e40af",      
        "secondary": "#3b82f6",   
        "bg_block": "#f8fafc",    
        "text": "#1e293b",       
        "font_family": "system-ui, -apple-system, sans-serif"
    },
    "dark": {
        "primary": "#f1f5f9",     
        "secondary": "#ef4444",   
        "bg_block": "#1e293b",    
        "text": "#f1f5f9",        
        "font_family": "system-ui, -apple-system, sans-serif"
    },
    "academic": {
        "primary": "#111827",      
        "secondary": "#4b5563",   
        "bg_block": "#f9fafb",   
        "text": "#111827",
        "font_family": "'Times New Roman', Times, serif"
    }
}

HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        @page {
            size: A4;
            margin: 20mm;
            @bottom-right {
                content: counter(page);
                font-family: {{ font_family }};
                font-size: 9pt;
                color: #9ca3af;
            }
        }
        
        body {
            font-family: {{ font_family }};
            color: {{ text }};
            line-height: 1.6;
            font-size: 11pt;
            background-color: {% if theme == 'dark' %}#0f172a{% else %}#ffffff{% endif %};
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid {{ secondary }};
            padding-bottom: 15px;
            margin-bottom: 30px;
        }

        .logo {
            max-height: 50px;
        }

        h1 {
            color: {{ primary }};
            font-size: 24pt;
            margin-top: 0;
            font-weight: 800;
        }

        h2 {
            color: {{ primary }};
            font-size: 18pt;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
            margin-top: 30px;
        }

        h3 {
            color: {{ secondary }};
            font-size: 14pt;
        }

        p, li {
            font-size: 11pt;
            margin-bottom: 10px;
        }

        code {
            font-family: 'Courier New', Courier, monospace;
            background-color: {{ bg_block }};
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9.5pt;
            color: {% if theme == 'dark' %}#fda4af{% else %}#be123c{% endif %};
        }

        pre {
            background-color: {{ bg_block }};
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            overflow-x: auto;
            margin: 20px 0;
        }

        pre code {
            color: inherit;
            background: none;
            padding: 0;
            font-size: 9pt;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
        }

        th, td {
            border: 1px solid #e2e8f0;
            padding: 10px;
            text-align: left;
            font-size: 10pt;
        }

        th {
            background-color: {{ bg_block }};
            color: {{ primary }};
            font-weight: bold;
        }

        blockquote {
            border-left: 4px solid {{ secondary }};
            padding-left: 15px;
            color: #64748b;
            font-style: italic;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        {% if logo_base64 %}
            <img class="logo" src="data:{{ logo_mime }};base64,{{ logo_base64 }}" />
        {% endif %}
    </div>

    <div class="content">
        {{ body_content }}
    </div>
</body>
</html>
"""

import json

def format_json_to_markdown(json_str: str) -> str:
    """
    Traduz uma coleção exportada do Postman v2.1.0 (como o Bag and Shop)
    em um documento Markdown técnico estruturado e super profissional.
    """
    try:
        data = json.loads(json_str)
    except Exception:
        
        return "# Erro de Sintaxe\nNão foi possível decodificar o arquivo JSON enviado."

    md = []
    
    info = data.get("info", {})
    name = info.get("name", "Documentação de API")
    
    
    md.append(f"# {name}")
        
    description = info.get("description", "")
    if description:
        md.append(f"{description}\n")
    md.append("---")

    def process_items(items, level=2):
        for item in items:
            name = item.get("name", "Sem nome")
            sub_items = item.get("item")
            
            if sub_items is not None:
                
                md.append(f"\n" + "#" * level + f"Grupo: {name}")
                md.append("---")
                process_items(sub_items, level + 1)
            else:
                
                request = item.get("request", {})
                method = request.get("method", "GET")
                url_data = request.get("url", {})
                
                url_raw = url_data if isinstance(url_data, str) else url_data.get("raw", "")
                
                method_badge = f"`{method}`"
                
                md.append(f"\n" + "#" * level + f" {method_badge} {name}")
                md.append(f"**Endpoint:** `{url_raw}`\n")
                
                desc = request.get("description", "")
                if desc:
                    md.append(f"*{desc}*\n")
                
                auth = request.get("auth", {})
                if auth:
                    auth_type = auth.get("type", "None")
                    md.append(f"**Autenticação:** Requer `{auth_type}`")
                
                headers = request.get("header", [])
                if headers:
                    md.append("\n**Cabeçalhos (Headers):**")
                    md.append("| Chave | Valor | Descrição |")
                    md.append("| :--- | :--- | :--- |")
                    for h in headers:
                        md.append(f"| `{h.get('key')}` | `{h.get('value')}` | {h.get('description', '-')} |")
                
                body = request.get("body", {})
                body_mode = body.get("mode")
                if body_mode == "raw":
                    raw_body = body.get("raw", "")
                    if raw_body.strip():
                        md.append("\n**Corpo da Requisição (JSON Payload):**")
                        md.append("```json")
                        try:
                            parsed_body = json.loads(raw_body)
                            md.append(json.dumps(parsed_body, indent=2, ensure_ascii=False))
                        except Exception:
                            md.append(raw_body.strip())
                        md.append("```")
                
                md.append("\n---")

    if "item" in data:
        process_items(data["item"])
        
    return "\n".join(md)
    
    
    
    
async def convert_document_to_pdf(
    file: UploadFile,
    file_type: str,
    theme: str,
    include_toc: bool,
    logo: Optional[UploadFile] = None
) -> io.BytesIO:
    
    
    content_bytes = await file.read()
    raw_content = content_bytes.decode("utf-8")

    
    markdown_text = format_json_to_markdown(raw_content) if file_type == "json" else raw_content

    
    extensions = ['tables', 'fenced_code', 'nl2br']
    if include_toc:
        extensions.append('toc')
    html_body = markdown.markdown(markdown_text, extensions=extensions)

  
    
    logo_base64 = ""
    logo_mime = "image/png"
    if logo:
        logo_bytes = await logo.read()
        logo_base64 = base64.b64encode(logo_bytes).decode("utf-8")
        logo_mime = logo.content_type or "image/png"

    
    palette = THEME_PALETTES.get(theme, THEME_PALETTES["modern"])
    template = Template(HTML_TEMPLATE)
    rendered_html = template.render(
        body_content=html_body,
        theme=theme,
        logo_base64=logo_base64,
        logo_mime=logo_mime,
        **palette
    )

    
    async with async_playwright() as p:
        
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        
        await page.set_content(rendered_html)
        
        
        pdf_bytes = await page.pdf(
            format="A4",
            print_background=True,
            margin={
                "top": "20mm",
                "bottom": "20mm",
                "left": "20mm",
                "right": "20mm"
            }
        )
        
        await browser.close()

    
    return io.BytesIO(pdf_bytes)