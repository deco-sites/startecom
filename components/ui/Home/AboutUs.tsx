import type { Image as DecoImage } from "deco-sites/std/components/types.ts";

export interface firstColumn {
  titleSubHeading?: string;
  titleHeading?: string;
  description?: string;
  link?: string;
  linkUrl?: string;
}

export interface secondColumn {
  image?: DecoImage;
}

export interface thirdColumn {
  subtitle?: string;
  paragraph?: string;
}

export interface Props {
  firstColumn?: firstColumn[];
  secondColumn?: secondColumn;
  thirdColumn?: thirdColumn[];
}

export default function AboutUs(props: Props) {
  return (
    <section class="xl:max-w-[1320px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] w-full mx-auto px-3">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:pt-[70px] lg:pb-[60px] md:pt-[80px] md:pb-[40px] pt-[60px] pb-[20px] items-center">
        <div class="md:col-span-2 lg:col-span-1 xl:pr-[55px] mt-0 lg:mt-[40px]">
          {!!props.firstColumn?.length && (
            <div class="flex flex-col md:flex-row px-3">
              {props.firstColumn.map((
                { titleSubHeading, titleHeading, description, link, linkUrl }
              ) => (
                <div class="flex flex-col lg:items-baseline items-center">
                  <span class="text-[#e71460] text-[16px] leading-[28px] pl-[60px] line font-semibold">
                    {titleSubHeading}
                  </span>
                  <h2 class="sm:text-[33px] text-[32px] font-semibold mb-[15px] text-[#262729] lg:text-left text-center">
                    {titleHeading}
                  </h2>
                  <p class="font-normal md:text-[16px] text-[18px] leading-[32px] mb-[33px] text-[#262729b3] lg:text-left text-center">
                    {description}
                  </p>
                  <a
                    href={linkUrl}
                    class="text-white bg-[#e71460] rounded-[50px] p-[5px] leading-[28px] font-semibold w-fit min-w-[183px] h-[56px] text-[15px] inline-flex items-center justify-center shadow--primary-2"
                    target="_blank"
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
        <div class="md:col-span-2 lg:col-span-2 sm:grid md:grid-cols-2 lg:mt-0 mt-[40px]">
          <div class="md:col-span-1 px-3 flex items-center justify-center md:mb-0 mb-[40px]">
            {props.secondColumn && props.secondColumn.image && (
              <figure>
                <img src={props.secondColumn.image} class="m-0" alt="Imagem" />
              </figure>
            )}
          </div>
          <div class="md:col-span-1 lg:col-span-1 xl:pl-[55px] lg:mt-[70px] mt-0">
            {!!props.thirdColumn?.length && (
              <div class="flex flex-col px-3">
                {props.thirdColumn.map(({ subtitle, paragraph }) => (
                  <div class="flex flex-col">
                    <h3 class="text-[21px] font-semibold text-[#e71460] mb-[13px]">
                      {subtitle}
                    </h3>
                    <p class="text-[15px] leading-[30px] text-[#25373fb3] mb-[16px] font-normal">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
