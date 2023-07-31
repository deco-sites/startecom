import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import useScrollEffects from "deco-sites/startecom/hooks/useScrollEffects.tsx";
import { useRef } from "preact/hooks";

export interface Props {
  background: LiveImage;
  badgePromo?: string;
  title?: string;
  description?: string;
  link?: string;
  linkUrl?: string;
}

export default function Community(props: Props) {
  const background = {
    backgroundImage: `url(${props.background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left top",
  };
  const spanRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  useScrollEffects({ Up: spanRef });
  useScrollEffects({ Up: h2Ref });
  useScrollEffects({ Up: descriptionRef });
  useScrollEffects({ Up: linkRef });
  return (
    <section
      style={background}
      class="h-full w-full relative lg:py-[130px] md:py-[80px] py-[60px]"
    >
      <div class="xl:max-w-[1320px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] w-full mx-auto h-full md:pb-[28px] md:mb-[-20px] pb-[15px] px-3">
        <div class="rounded-[15px] py-[56px] px-[30px] bg-[#5034fcd9] lg:w-[50%] md:w-[66.66667%] sm:w-[83.33333%] w-full flex flex-col items-center mx-auto">
          <span
            ref={spanRef}
            class="bg-[#fcdc00] text-[#262729] min-w-[112px] h-[30px] mb-[22px] text-[13px] font-semibold leading-[22px] rounded-[15px] flex items-center justify-center leadin-[1.875]"
          >
            {props.badgePromo}
          </span>
          <h2
            ref={h2Ref}
            class="text-[36px] mb-[13px] font-semibold text-white text-center"
          >
            {props.title}
          </h2>
          <p
            ref={descriptionRef}
            class="text-[16px] text-white font-normal mb-[40px] text-center"
          >
            {props.description}
          </p>
          <div ref={linkRef}>
            <a
              href={props.linkUrl}
              class="text-white bg-[#e71460] rounded-[55px] p-[5px] leading-[28px] font-semibold w-fit min-w-[163px] h-[56px] text-[15px] inline-flex items-center justify-center shadow--primary-2 hover:bg-[#ff7043] hover:border hover:border-[#ff6838]"
              target="_blank"
            >
              {props.link}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
