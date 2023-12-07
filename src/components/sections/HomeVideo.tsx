// components
import Logo from '@/components/layout/Logo';

const HomeVideo = () => {
  return (
    <div className="pointer-events-none relative h-[470px] select-none md:h-[calc(100vh_-_80px)]">
      <video
        playsInline
        muted
        loop
        autoPlay
        preload="auto"
        className="absolute h-full w-full object-cover"
      >
        <source src="/videos/clothing-shoot.webm" type="video/webm" />
        <source src="/videos/clothing-shoot.mp4" type="video/mp4" />
      </video>
      <Logo size="lg" className="absolute bottom-4 right-4 md:bottom-8 md:right-8" />
    </div>
  );
};

export default HomeVideo;
