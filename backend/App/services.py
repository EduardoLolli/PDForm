import io
from pypdf import PdfWriter
from fastapi import UploadFile
from PIL import Image


def merge_pdf_files(uploaded_files) -> io.BytesIO:
    
    merger = PdfWriter()
    
    for file in uploaded_files:
        
        merger.append(file.file)
        
    output_stream = io.BytesIO()
    
    merger.write(output_stream)
    merger.close()
    
    output_stream.seek(0)
    
    return output_stream

def convert_image_to_pdf(Uploaded_files: list[UploadFile]) -> io.BytesIO:
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