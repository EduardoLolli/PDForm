import { useState } from 'react';
import { downloadBlob } from '../util/pdf';
import { CheckboxLabel, FormGroup, ListTitle, MenuToggleButton, PreContainerGrid, PreviewBox, SectionResult } from '../components/pdfAction/style';
import { Container, Title } from '../components/Home/styles';
import { FileDropzone } from '../components/pdfAction/FileDropZone';
import { Sidebar } from '../components/sidebar';



export const ConvertDocToPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [fileName, setFileName] = useState('');
  const [theme, setTheme] = useState('modern');
  const [logo, setLogo] = useState<File | null>(null);
  const [includeToc, setIncludeToc] = useState(true);

  const handleFilesAccepted = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    
    const nameWithoutExtension = selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.'));
    setFileName(nameWithoutExtension);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setFileContent(e.target.result as string);
      }
    };
    reader.readAsText(selectedFile);
    setSidebarOpen(true);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleGeneratePdf = async () => {
    if (!file) return alert("Selecione um arquivo de documentação primeiro!");
    if (!fileName.trim()) return alert("Digite um nome para o arquivo final.");

    setLoading(true);
    const formData = new FormData();
    
    formData.append("file", file);
    formData.append("filename", fileName);
    formData.append("theme", theme);
    formData.append("include_toc", String(includeToc));
    
    if (logo) {
      formData.append("logo", logo);
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/v1/pdf/convert-doc", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao gerar PDF da documentação.");

      const blob = await response.blob();
      
      downloadBlob(blob, `${fileName.trim()}.pdf`);

      setFile(null);
      setFileContent('');
      setLogo(null);
      setSidebarOpen(false);
    } catch (error) {
      console.error(error);
      alert("Falha ao converter o documento em PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PreContainerGrid>
      
      <Container>
        <Title>Documentação para PDF</Title>

        <FileDropzone
          onFilesAccepted={handleFilesAccepted}
          accept={{ 
            'text/markdown': ['.md'], 
            'application/json': ['.json'] 
          }}
          disabled={loading}
        />

        {file && fileContent && (
          <SectionResult>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <ListTitle>Pré-visualização do arquivo ({file.name}):</ListTitle>
              <button 
                type="button" 
                onClick={() => { setFile(null); setFileContent(''); setSidebarOpen(false); }}
                style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 600, cursor: 'pointer' }}
              >
                Trocar arquivo
              </button>
            </div>
            
            <PreviewBox>
              {fileContent}
            </PreviewBox>
          </SectionResult>
        )}
      </Container>

      {file && (
        <Sidebar
          title="Estilo do Manual"
          actionButtonText={loading ? "Gerando..." : "Gerar Documentação →"}
          onAction={handleGeneratePdf}
          isActionDisabled={loading}
          isOpen={sidebarOpen}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            
            <FormGroup>
              <label>Nome do PDF final:</label>
              <input 
                type="text" 
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Ex: manual_do_usuario"
              />
            </FormGroup>

            <FormGroup>
              <label>Tema visual:</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="modern">Moderno (Minimalista / Azul)</option>
                <option value="dark">Modo Escuro (Grafite / Slate)</option>
                <option value="academic">Acadêmico (Clássico / Serifado)</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Logo do cabeçalho:</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleLogoChange}
                style={{ fontSize: '0.8rem' }}
              />
              {logo && <span style={{ fontSize: '0.75rem', color: '#10b981' }}>✓ {logo.name}</span>}
            </FormGroup>

            <FormGroup>
              <label>Estrutura:</label>
              <CheckboxLabel>
                <input 
                  type="checkbox" 
                  checked={includeToc}
                  onChange={(e) => setIncludeToc(e.target.checked)}
                />
                Gerar sumário (TOC) automático
              </CheckboxLabel>
            </FormGroup>

          </div>
        </Sidebar>
      )}

      {file && (
        <MenuToggleButton type="button" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '✕' : '⚙️'}
        </MenuToggleButton>
      )}

    </PreContainerGrid>
  );
};