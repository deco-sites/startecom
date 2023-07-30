import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { useEffect, useState } from "preact/hooks";

interface WindowSize {
  width: number;
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
}

export default function Nav(props: Props) {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
  });

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(prefersDarkMode.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setDarkMode(event.matches);
    };

    prefersDarkMode.addEventListener("change", handleChange);

    return () => {
      prefersDarkMode.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    addEventListener("resize", handleResize);

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  const isDarkModeActive = props.modeActive === "Dark" ||
    (props.modeActive === undefined && darkMode);

  const isDesktop = windowSize.width >= 1024;

  const applyHeaderStyle = () => {
    const header = document.querySelector("header");

    if (header) {
      const scrollY = window.scrollY;

      if (isDesktop) {
        header.classList.add("fixed");
        header.classList.remove("absolute");
      } else {
        header.classList.remove("fixed");
        header.classList.add("absolute");
      }

      if (isDesktop && scrollY >= 800) {
        header.style.transform = "translateY(0%)";
        header.style.boxShadow = "0 12px 34px -11px rgba(65, 62, 101, 0.1)";
        header.style.transition = "0.4s";
      } else if (isDesktop && scrollY > 77) {
        header.style.transform = "translateY(-100%)";
        header.style.boxShadow = "none";
        header.style.transition = "0.4s";
      } else {
        header.style.transform = "translateY(0%)";
        header.style.boxShadow = "none";
        header.style.transition = "0.4s";
      }
    }
  };

  useEffect(() => {
    applyHeaderStyle();

    const handleScroll = () => {
      applyHeaderStyle();
      setScrolling(window.scrollY > 0);
    };

    addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, [scrolling]);

  useEffect(() => {
    applyHeaderStyle();
  }, [windowSize.width]);

  const headerClasses = `w-full z-20 px-3 ${
    scrolling && isDesktop ? (isDarkModeActive ? "bg-black" : "bg-white") : ""
  }`;

  return (
    <header
      class={headerClasses}
    >
      <nav class="flex items-center h-[77px] xl:max-w-[1320px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] w-full m-auto relative pb-2 col-xs-11">
        {isDarkModeActive
          ? (
            !!props.brandLogoDark && (
              <a href={props.link} class="block">
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
              <a href={props.link} class="block">
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
      </nav>
    </header>
  );
}
