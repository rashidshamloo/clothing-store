const AboutUs = () => {
  return (
    <section className="flex items-center justify-center border-t-[1px] border-purple bg-lightPurple py-[48px] md:py-[64px]">
      <h2 className="sr-only">About us</h2>
      <div className="flex max-w-[95%] flex-col items-center justify-center gap-[32px] text-center md:max-w-[700px]">
        <h3 className="font-lora text-[clamp(28px,18px_+_2vw,40px)] font-semibold text-veryDarkPurple">
          Perfect blend of Japanese and Western fashion
        </h3>
        <p className="max-w-[90%] font-lora text-[clamp(20px,14px_+_2vw,24px)] font-medium leading-relaxed text-darkPurple md:max-w-none md:leading-normal">
          We strive to create pieces that are both unique and timeless and take pride in offering
          high-quality clothing that is both comfortable and stylish.
        </p>
        <a href="/about-us" className="btn-very-dark mt-2 text-[clamp(18px,10px_+_2vw,22px)]">
          About Us
        </a>
      </div>
    </section>
  );
};

export default AboutUs;
