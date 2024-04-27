import { Button, Container, FormControl, InputLabel, OutlinedInput} from '@mui/material';

const ContactUs = () => {
  return (
    <div className="mt-16 md:mt-20">
      <div className="background-contact relative lg:h-[560px]">
        <Container>
          <div className="py-20 text-center lg:absolute lg:bottom-20 lg:text-left lg:py-0">
            <div className="xl:text-[64px] lg:text-[58px] md:text-[52px] text-[40px] font-extrabold">
              <p className=" text-primary">Where</p>
              <p className="text-white">to find us?</p>
            </div>
            <div className="flex flex-col gap-10 mt-10 text-white lg:flex-row max-lg:items-center">
              <div className="flex-col w-[180px]">
                <h6 className="mb-2 text-lg">Bali</h6>
                <p className="text-sm opacity-80">508 Bridle Avenue Newnan, GA 30263</p>
              </div>
              <div className="flex-col w-[180px]">
                <h6 className="mb-2 text-lg">London</h6>
                <p className="text-sm opacity-80">508 Bridle Avenue Newnan, GA 30263</p>
              </div>
              <div className="flex-col w-[180px]">
                <h6 className="mb-2 text-lg">Prague</h6>
                <p className="text-sm opacity-80">508 Bridle Avenue Newnan, GA 30263</p>
              </div>
              <div className="flex-col w-[180px]">
                <h6 className="mb-2 text-lg">Moscow</h6>
                <p className="text-sm opacity-80">508 Bridle</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container className="py-20">
        <div className="grid gap-20 lg:grid-cols-2">
          <div className="flex flex-col gap-10">
            <h3 className="font-bold text-2xl leading-normal md:text-[26px] lg:text-[30px] xl:text-[32px]">
              Feel free to contact us. <br />
              We'll be glad to hear from you, buddy.
            </h3>
            <div className="flex flex-col gap-6">
              <FormControl variant="outlined" color="default">
                <InputLabel htmlFor="name">Name</InputLabel>
                <OutlinedInput id="name" label="Name" />
              </FormControl>
              <FormControl variant="outlined" color="default">
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput id="email" label="Email" />
              </FormControl>
              <FormControl variant="outlined" color="default">
                <InputLabel htmlFor="subject">Subject</InputLabel>
                <OutlinedInput id="subject" label="Subject" />
              </FormControl>
              <FormControl variant="outlined" color="default">
                <InputLabel htmlFor="messsage">Enter your message here</InputLabel>
                <OutlinedInput multiline rows={4} id="message" label="Enter your message here" />
              </FormControl>
            </div>
            <div className="w-[120px]">
              <Button size="large" variant="contained">
                Submit Now
              </Button>
            </div>
          </div>
          <div className="h-[560px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.856168121188!2d108.25831637480982!3d15.968885884696146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142116949840599%3A0x365b35580f52e8d5!2zxJDhuqFpIGjhu41jIEZQVCDEkMOgIE7hurVuZw!5e0!3m2!1svi!2s!4v1714191687006!5m2!1svi!2s"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ Google"
            ></iframe>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
