import type { Image as DecoImage } from "deco-sites/std/components/types.ts";

export interface Props {
  /** @description Title */
  label?: string;
  /** @description Paragraph */
  /** @format textarea */
  paragraph?: string;
  /** @description Background Overlay */
  backgroundOverlay?: DecoImage;
  /** @description Background */
  background?: DecoImage;
}

export default function HeroArea(props: Props) {
  const background = {
    backgroundImage: `url(${props.background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
  };

  const backgroundOverlay = {
    backgroundImage: `url(${props.backgroundOverlay})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  };

  return (
    <section
      style={background}
      class="h-full w-full relative xl:pt-[235px] lg:pt-[205px] md:pt-[115px] pt-[130px] xl:pb-[220px] lg:pb-[130px] md:pb-[60px] pb-[40px]"
    >
      <span style={backgroundOverlay} />
      <div class="xl:max-w-[1320px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] w-full mx-auto h-full md:pb-[28px] md:mb-[-20px] pb-[15px] col-xs-11">
        <div class="xl:w-1/2 lg:w-[58.33333%] md:w-[66.66667%] sm:w-[91.66667%] w-full px-3 lg:mt-0 md:mt-[30px] mt-0 mb-[40px]">
          <h1 class="lg:text-[58px] md:text-[48px] text-[38px] z-10 text-white relative mb-[21px] font-semibold leading-tight tracking-[-0.5px]">
            {props.label}
          </h1>
          <p class="z-10 text-[#ffffffb3] relative text-base font-normal leading-loose mb-[10px]">
            {props.paragraph}
          </p>
        </div>
      </div>
    </section>
  );
}
