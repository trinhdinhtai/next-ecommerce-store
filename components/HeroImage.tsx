import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="w-full relative aspect-[21/9] rounded-xl select-none">
        <Image
          fill
          src="/images/hero.jpg"
          alt=""
          className="object-cover rounded-xl select-none"
        />
      </div>
    </div>
  );
};

export default HeroImage;
