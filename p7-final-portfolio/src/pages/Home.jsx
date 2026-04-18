import { AboutMe } from "../components/AboutMe";
import { ContactSection } from "../components/ContactSection";
import { SkillSection } from "../components/SkillSection";
import { ProjectSection } from "../components/ProjectSection";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
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
        start: "top 20%",
        end: "bottom 10%",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <AboutMe />
      <section className='spotlight'>
        <SkillSection />
        <ProjectSection />
        <ContactSection />

        <svg
          // width='2300'
          // height='4185'
          viewBox='0 0 2300 4185'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          preserveAspectRatio="xMidYMid meet"
          stroke='#ffeb99'
          strokeWidth='200'
          strokeLinecap="round"
          strokeLinejoin="round"
          className='svg-path'
        >
          <path
          ref={pathRef}
            d='M2114.96 0.488678C1163.21 206.633 129.94 65.8515 129.941 855.234C129.941 1217.24 882.617 1292.66 1085.48 1342.94C1288.34 1393.22 1640.98 1448.53 2003.1 1777.86C2003.1 1777.86 2248.67 1955.03 2285.59 2157.46C2317.55 2332.7 2295.55 2469.68 2207.86 2607.46C2130.76 2728.59 2008.96 2808.78 1868.49 2909.14C1392.93 3248.91 878.826 3361.65 503.435 3205.78C128.044 3049.92 11.6138 2843.77 1.0185 2567.24C-21.0576 1991.06 666.939 1983.29 1085.48 2129.81C1330.05 2215.42 2003.1 2386.23 2207.86 3170.59C2412.62 3954.94 1.0185 4183.99 1.0185 4183.99'
            stroke='#ffeb99'
            vectorEffect="non-scaling-stroke"

          />
        </svg>
      </section>
    </>
  );
};
