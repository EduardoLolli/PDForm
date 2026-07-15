import json
import io
from pypdf import PdfReader, PdfWriter
from fastapi.responses import StreamingResponse
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from app.services import merge_pdf_files, convert_image_to_pdf, convert_pages_to_pdf, convert_document_to_pdf

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
    
    
@router.post("/convert-doc")
async def convert_doc_endpoint(
    file: UploadFile = File(...),
    filename: str = Form(...),
    theme: str = Form("modern"),
    include_toc: bool = Form(True), 
    logo: UploadFile | None = File(None)
):
    file_ext = file.filename.split(".")[-1].lower() if file.filename else ""
    if file_ext not in ["md", "json"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Apenas arquivos .md (Markdown) ou .json são suportados."
        )

    try:
        pdf_io = await convert_document_to_pdf(
            file=file,
            file_type=file_ext,
            theme=theme,
            include_toc=include_toc,
            logo=logo
        )

        clean_filename = f"{filename.replace(' ', '_')}.pdf"
        return StreamingResponse(
            pdf_io,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={clean_filename}"}
        )

    except Exception as e:
        print(f"Erro na conversão de documento: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Falha ao processar o documento: {str(e)}"
        )