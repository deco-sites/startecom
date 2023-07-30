import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { useEffect, useState } from "preact/hooks";

export interface Props {
  preloader: LiveImage;
  alt?: string;
}

export default function Loading(props: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      addEventListener("load", handleLoad);
    }

    return () => {
      removeEventListener("load", handleLoad);
    };
  }, []);

  if (loading) {
    return (
      <section class="bg-white w-full h-full fixed top-0 left-0 flex items-center justify-center z-50 overflow-hidden">
        <figure>
          <Image
            src={props.preloader || ""}
            class="w-[103px] h-full"
            width={103}
            height={69}
            alt={props.alt}
          />
        </figure>
      </section>
    );
  }

  return null;
}
