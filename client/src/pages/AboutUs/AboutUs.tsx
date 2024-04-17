import { Container } from '@mui/material';

const AboutUs = () => {
  return (
    <div className="mt-16 md:mt-20">
      <div className="background-hero relative lg:h-[560px]">
        <Container>
          <div className="py-20 text-center lg:absolute bottom-20 lg:text-left lg:py-0">
            <div className="text-[40px] md:text-[52px] lg:text-[64px] font-extrabold text-primary leading-tight">
              Who
            </div>
            <div className="text-white text-[40px] md:text-[52px] lg:text-[64px] font-extrabold leading-tight">
              we are?
            </div>
            <p className="mt-6 text-xl font-semibold leading-normal text-white lg:text-2xl">
              Let's work together and <br /> make awesome site easily
            </p>
          </div>
        </Container>
      </div>
      <Container className="px-6 py-32">
        <div className="grid grid-cols-12">
          <div className="col-span-7">1</div>
          <div className="col-span-5">2</div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
