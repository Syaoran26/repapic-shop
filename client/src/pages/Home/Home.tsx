import Carousel from './Carousel';
import { ProductCarousel } from '@common';
import { Container } from '@mui/material';
import Heading from './Heading';

const Home = () => {
  return (
    <>
      <Carousel />
      <Container className="py-20">
        <Heading title="Top trending" />
        <ProductCarousel />
      </Container>
    </>
  );
};

export default Home;
