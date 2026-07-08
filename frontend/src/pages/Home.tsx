import { CardFunctionLink } from '../components/CardFunctionLink';
import { Container, Grid, Subtitle, Title } from '../components/styles/Home';


export const Home = () => {
  return (
    <Container>
      <Title>Conversor de PDF</Title>
      <Subtitle>texto bonitin.</Subtitle>

      <Grid>

        <CardFunctionLink
          iconString='📄+📄'
          title='Juntar PDF'
          description='Mesclar e combinar arquivos PDF na ordem que você desejar.'
          route='/merge'
        />

        <CardFunctionLink
          iconString='🖼️ ➔ 📄'
          title='Imagens para PDF'
          description='Converta imagens para PDF'
          route='/from-images'
        />
      </Grid>
    </Container>
  );
};