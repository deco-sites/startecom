import type { Image as DecoImage } from "deco-sites/std/components/types.ts";
import { useEffect, useState } from "preact/hooks";

export interface Props {
  /** @description Mode Active (either brand logo dark or brand logo light) */
  modeActive?: "Dark" | "Light";
  /** @description Light version logo (logo must be black) */
  brandLogoLight?: DecoImage;
  /** @description Text Alternative for Light Mode  */
  brandLogoLightAlt?: string;
  /** @description Dark version logo (logo must be white) */
  brandLogoDark?: DecoImage;
  /** @description Text Alternative for Dark Mode  */
  brandLogoDarkAlt?: string;
  /** @description Link Logo */
  link?: string;
}

export default function Nav(props: Props) {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolling, setScrolling] = useState(false);

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

  const isDarkModeActive = props.modeActive === "Dark" ||
    (props.modeActive === undefined && darkMode);

  return (
    <header
      class={`fixed w-full z-10 px-3 ${
        scrolling
          ? (isDarkModeActive ? "bg-white" : "bg-black")
          : "bg-transparent"
      }`}
    >
      <nav class="flex items-center h-[77px] max-w-[1320px] m-auto relative pb-2">
        {isDarkModeActive
          ? (
            !!props.brandLogoDark && (
              <a href={props.link} class="block">
                <figure>
                  <img src={props.brandLogoDark} alt={props.brandLogoDarkAlt} />
                </figure>
              </a>
            )
          )
          : (
            !!props.brandLogoLight && (
              <a href={props.link} class="block">
                <figure>
                  <img
                    src={props.brandLogoLight}
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
