import { CardFunctionLink } from "../components/Home/CardFunctionLink";
import { CardTitle, Container, Grid, Subtitle } from "../components/Home/styles";
import options from './../menu.json'


export const Home = () => {

  return (
    <Container>
      <CardTitle>Conversor de PDF</CardTitle>
      <Subtitle>texto bonitin.</Subtitle>

      <Grid>
        {
          options.map((item, idx) => (
            <CardFunctionLink
              key={idx}
              iconString={item.iconString}
              title={item.title}
              description={item.description}
              route={item.route}
            />
          ))}

      </Grid>
    </Container>
  );
};