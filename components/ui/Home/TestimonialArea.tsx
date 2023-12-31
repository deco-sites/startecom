import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import type { HTML } from "deco-sites/std/components/HTMLRenderer.tsx";
import HTMLRenderer from "deco-sites/std/components/HTMLRenderer.tsx";
import useScrollEffects from "deco-sites/startecom/hooks/useScrollEffects.tsx";
import { useRef } from "preact/hooks";
export interface SocialMedia {
  icon: LiveImage;
  link?: string;
  alt?: string;
}

export interface Person {
  image: LiveImage;
  label?: string;
  title?: HTML;
  socialProfile?: Array<SocialMedia>;
}

export interface Props {
  titleSubHeading?: string;
  /** @format textarea */
  titleHeading?: string;
  heads?: Array<Person>;
}

export default function TestimonialArea(props: Props) {
  const spanRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLDivElement>(null);
  const upRef = useRef<HTMLDivElement>(null);

  useScrollEffects({ Up: spanRef });
  useScrollEffects({ Up: h2Ref });
  useScrollEffects({ Up: upRef });

  return (
    <section class="bg-[#f3f4f6] md:pt-[135px] md:pb-[110px] sm:pt-[75px] sm:pb-[60px] pt-[55px] pb-[40px] flex flex-col">
      <div class="xl:max-w-[1320px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] w-full mx-auto px-3">
        <div class="lg:w-[46%] md:w-[66.66667%] sm:w-[83.33333%] w-full md:px-3 flex flex-col items-center mx-auto">
          <span
            ref={spanRef}
            class="text-[#e71460] text-[16px] leading-[28px] pl-[60px] line font-semibold md:text-left text-center mb-[20px]"
          >
            {props.titleSubHeading}
          </span>
          <h2
            ref={h2Ref}
            class="sm:text-[33px] text-[32px] font-semibold mb-[12px] text-[#262729] text-center"
          >
            {props.titleHeading}
          </h2>
        </div>
      </div>
      <div ref={upRef}>
        {!!props.heads?.length && (
          <ul class="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-[7.5px]">
            {props.heads.map((head) => (
              <li class="flex flex-col list-none rounded-[15px] cursor-all-scroll px-[15px]">
                <figure class="bg-[#fff] rounded-[15px] my-[49px]">
                  <Image
                    src={head.image}
                    alt={head.label}
                    class="rounded-t-[15px] w-full"
                    width={317}
                    height={407}
                  />
                  <figcaption class="card-hover rounded-b-[15px] pt-[15px] pb-[10px] pl-[45px]">
                    <h3 class="text-white text-[21px] leading-[30px] font-semibold">
                      {head.label}
                    </h3>
                    <div class="font-medium ql-editor">
                      <HTMLRenderer html={head.title || ""} />
                    </div>
                    <ul class="mt-[15px] mb-[16px]">
                      {head.socialProfile?.map((social) => (
                        <li class="mt-15px">
                          <a href={social.link}>
                            <Image
                              src={social.icon}
                              alt={social.alt}
                              width={14}
                              height={16}
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
