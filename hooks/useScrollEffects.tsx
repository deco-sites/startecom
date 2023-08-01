import { useEffect, useState } from "preact/hooks";
import { RefObject } from "preact";

interface ScrollEffects {
  Right?: RefObject<HTMLDivElement> | null;
  Left?: RefObject<HTMLDivElement> | null;
  Up?: RefObject<HTMLDivElement> | null;
}

const useScrollEffects = ({ Right, Left, Up }: ScrollEffects) => {
  const [hasEffectRun, setHasEffectRun] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasEffectRun) {
        const elementRight = Right?.current;
        const elementLeft = Left?.current;
        const elementUp = Up?.current;

        const isRightVisible = !Right || (elementRight && isElementInViewport(elementRight));
        const isLeftVisible = !Left || (elementLeft && isElementInViewport(elementLeft));
        const isUpVisible = !Up || (elementUp && isElementInViewport(elementUp));

        if (isRightVisible && isLeftVisible && isUpVisible) {
          elementRight?.classList.add("fade-in-from-right");
          elementLeft?.classList.add("fade-in-from-left");
          elementUp?.classList.add("fade-in-from-up");
          setHasEffectRun(true);
          removeEventListener("scroll", handleScroll);
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

function isElementInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}