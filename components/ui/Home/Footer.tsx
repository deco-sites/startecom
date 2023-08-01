import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export interface Link {
  icon: LiveImage;
  alt?: string;
  link?: string;
}

export interface Props {
  /** @description Mode Active (either brand logo dark or brand logo light) */
  modeActive?: "Dark" | "Light";
  /** @description Light version logo (logo must be black) */
  brandLogoLight?: LiveImage;
  /** @description Text Alternative for Light Mode  */
  brandLogoLightAlt?: string;
  /** @description Dark version logo (logo must be white) */
  brandLogoDark?: LiveImage;
  /** @description Text Alternative for Dark Mode  */
  brandLogoDarkAlt?: string;
  /** @description Link Logo */
  link?: string;
  phrase?: string;
  links?: Array<Link>;
  copyright?: string;
}

export default function Footer(props: Props) {
  const isDarkModeActive =
    props.modeActive === "Dark" || (!props.modeActive && !!props.brandLogoDark);

  return (
    <footer class={`${isDarkModeActive ? "bg-[#19191b]" : "bg-[#f3f4f6]"} pt-[80px] pb-[40px]`}>
      <div class="xl:max-w-[1320px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] w-full mx-auto h-full">
        <div class="flex flex-col items-center mx-auto mb-5 px-3">
          {isDarkModeActive
            ? (
              !!props.brandLogoDark && (
                <a href={props.link} class="block mb-[25px]">
                  <figure>
                    <Image
                      src={props.brandLogoDark}
                      class="w-full h-[21px]"
                      width={119}
                      height={21}
                      alt={props.brandLogoDarkAlt}
                    />
                  </figure>
                </a>
              )
            )
            : (
              !!props.brandLogoLight && (
                <a href={props.link} class="block mb-[25px]">
                  <figure>
                    <Image
                      src={props.brandLogoLight}
                      class="w-full h-[21px]"
                      width={119}
                      height={21}
                      alt={props.brandLogoLightAlt}
                    />
                  </figure>
                </a>
              )
            )}
          <p class={`${isDarkModeActive ? "text-white" : "text-[#262729b3]"} text-[15px] leading-[28px] font-normal`}>
            {props.phrase}
          </p>
        </div>
        <div class="flex flex-col justify-center items-center mx-auto pt-[30px] pb-[40px]">
          {!!props?.links?.length && (
            <ul class="w-full px-3 flex justify-center items-center mx-auto mb-[60px]">
              {props.links.map((link) => (
                <li class="px-[10px]">
                  <a href={link.link} class="footer-social-share">
                    <figure class="w-full h-full flex items-center justify-center">
                      <Image
                        src={link.icon}
                        class="w-full h-[15px]"
                        width={13.13}
                        height={15}
                        alt={link.alt}
                      />
                    </figure>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p class={`${isDarkModeActive ? "text-white" : "text-[#828288]"} px-3 text-[13px] leading-[22px] font-normal`}>
            {props.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
