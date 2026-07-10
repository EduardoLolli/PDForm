import io
import json
from pypdf import PdfReader, PdfWriter
from fastapi.responses import StreamingResponse
from fastapi import UploadFile, HTTPException, status
from fastapi import UploadFile
from PIL import Image


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
    