import json
import io
from pypdf import PdfReader, PdfWriter
from fastapi.responses import StreamingResponse
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from app.services import merge_pdf_files, convert_image_to_pdf, convert_pages_to_pdf

router = APIRouter(
    prefix="/api/v1/pdf",
    tags=["PDF Tools"]
)

@router.post("/merge")
async def merge(files: list[UploadFile] = File(description="Selecione os PDFs")):
    
    if len(files) < 2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Você precisa enviar pelo menos 2 arquivos PDF para realizar a mesclagem."
        )
    
    for file in files:
        if not file.filename.endswith('.pdf'):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"O arquivo {file.filename} não é um PDF válido."
            )

    try:
        
        merged_pdf_stream =  await merge_pdf_files(files)
        
        return StreamingResponse(
            merged_pdf_stream,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=merged.pdf"}
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao processar os PDFs: {str(e)}"
        )
        
@router.post("/from-images")
async def from_images(files: list[UploadFile] = File(...)):
    pdf_strem = await convert_image_to_pdf(files)
    
    return StreamingResponse(
        pdf_strem,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=pdf_images.pdf"}
    )

@router.post("/split")
async def split_pdf(
    file: UploadFile = File(...),
    pages: str = Form(...)  
):
    
    sliced_pdf = await convert_pages_to_pdf(file, pages)
    
    
    return StreamingResponse(
            sliced_pdf,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=splited_pdf.pdf"}
        )
    