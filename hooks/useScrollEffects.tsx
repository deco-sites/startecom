import { useEffect, useState } from "preact/hooks";

interface ScrollEffects {
  Right?: preact.RefObject<HTMLDivElement> | null;
  Left?: preact.RefObject<HTMLDivElement> | null;
  Up?: preact.RefObject<HTMLDivElement> | null;
}

const useScrollEffects = ({ Right, Left, Up }: ScrollEffects) => {
  const [hasEffectRun, setHasEffectRun] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasEffectRun) {
        const elementRight = Right?.current;
        const elementLeft = Left?.current;
        const elementUp = Up?.current;
        if (
          (!Right || elementRight) &&
          (!Left || elementLeft) &&
          (!Up || elementUp)
        ) {
          const rectRight = elementRight?.getBoundingClientRect();
          const rectLeft = elementLeft?.getBoundingClientRect();
          const rectUp = elementUp?.getBoundingClientRect();
          const windowHeight =
            window.innerHeight || document.documentElement.clientHeight;
          if (
            (!Right || (rectRight && rectRight.top < windowHeight && rectRight.bottom >= 0)) &&
            (!Left || (rectLeft && rectLeft.top < windowHeight && rectLeft.bottom >= 0)) &&
            (!Up || (rectUp && rectUp.top < windowHeight && rectUp.bottom >= 0))
          ) {
            if (elementRight) elementRight.classList.add("md:fade-in-from-right");
            if (elementLeft) elementLeft.classList.add("md:fade-in-from-left");
            if (elementUp) elementUp.classList.add("md:fade-in-from-up");
            setHasEffectRun(true);
            removeEventListener("scroll", handleScroll);
          }
        }
      }
    };

    addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, [hasEffectRun, Right, Left, Up]);

  return { Right, Left, Up };
};

export default useScrollEffects;
