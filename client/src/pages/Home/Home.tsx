import Carousel from './Carousel';
import { ProductCarousel } from '@common';
import { Container } from '@mui/material';
import Heading from './Heading';

const Home = () => {
  return (
    <div>
      <Carousel />
      <Container className="py-20">
        <Heading title="Top trending" />
        <ProductCarousel />
      </Container>
    </div>
  );
};

export default Home;
