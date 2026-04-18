import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const SvgLine = () => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <svg
        width='120%'
        height='100%'
        stroke='blue'
        stroke-width='2em'
        viewBox='0 0 608 825'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M558.137 0.493469C307.137 41.4935 34.6367 13.4935 34.6368 170.493C34.6368 242.493 233.137 257.493 286.637 267.493C340.137 277.493 433.137 288.493 528.637 353.993C528.637 353.993 593.4 389.232 603.137 429.493C611.566 464.346 605.764 491.591 582.637 518.993C562.305 543.085 530.181 559.033 493.137 578.993C367.72 646.57 232.137 668.993 133.137 637.993C34.1367 606.993 3.431 565.993 0.636741 510.993C-5.18528 396.398 176.257 394.853 286.637 423.993C351.136 441.021 528.637 474.993 582.637 630.993C636.637 786.993 168.137 824.493 168.137 824.493'
          stroke='black'
        />
      </svg>
    </>
  );
};
