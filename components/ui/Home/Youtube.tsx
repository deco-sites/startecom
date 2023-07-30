import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import useScrollEffects from "deco-sites/startecom/hooks/useScrollEffects.tsx";
import { useRef } from "preact/hooks";

export interface Props {
  background: LiveImage;
  backgroundOverlay: LiveImage;
  Title?: string;
  description?: string;
  linkUrl?: string;
  linkImage: LiveImage;
  linkAlt?: string;
}

export default function Youtube(props: Props) {
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

  const h2Ref = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useScrollEffects({ Up: h2Ref });
  useScrollEffects({ Up: descriptionRef });

  return (
    <section
      style={background}
      class="h-full w-full relative xl:pt-[235px] lg:pt-[205px] md:pt-[115px] pt-[130px] xl:pb-[220px] lg:pb-[130px] md:pb-[60px] pb-[40px]"
    >
      <span style={backgroundOverlay} />
      <div class="xl:max-w-[1320px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] h-full mx-auto flex flex-col">
        <div class="xl:w-[46%] lg:w-[66.66667%] md:w-[83.33333%] w-full md:px-0 px-3 md:m-0 mx-auto col-xs-11">
          <h2
            ref={h2Ref}
            class="md:text-[58px] sm:text-[48px] text-[38px] mb-[21px] tracking-tighter text-white font-semibold z-10 relative leading-[1.2068]"
          >
            {props.Title}
          </h2>
          <p
            ref={descriptionRef}
            class="text-[#ffffffb3] mb-[10px] text-[16px] font-normal z-10 relative"
          >
            {props.description}
          </p>
          <div class="pt-[28px] mb-[-20px] z-10 relative">
            <a href={props.linkUrl || ""}>
              <figure>
                <Image
                  src={props.linkImage || ""}
                  width={57.99}
                  height={61}
                  alt={props.linkAlt}
                />
              </figure>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
