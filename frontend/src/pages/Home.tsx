import { CardDescription, CardIcon, CardLink, CardTitle, Container, Grid, Subtitle, Title } from '../components/styles/Home';


export const Home = () => {
  return (
    <Container>
      <Title>Ferramentas de PDF Completamente Gratuitas</Title>
      <Subtitle>Otimize, junte, divida e converta seus arquivos de forma rápida e segura.</Subtitle>

      <Grid>
        {/* Card 1: Juntar PDF */}
        <CardLink to="/merge">
          <CardIcon>📄+📄</CardIcon>
          <CardTitle>Juntar PDF</CardTitle>
          <CardDescription>
            Mesclar e combinar arquivos PDF na ordem que você desejar.
          </CardDescription>
        </CardLink>

        {/* Card 2: Imagens para PDF */}
        <CardLink to="/from-images">
          <CardIcon>🖼️ ➔ 📄</CardIcon>
          <CardTitle>Imagens para PDF</CardTitle>
          <CardDescription>
            Converta suas imagens JPG, JPEG e PNG em documentos PDF em segundos.
          </CardDescription>
        </CardLink>
      </Grid>
    </Container>
  );
};