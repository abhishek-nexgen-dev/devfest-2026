import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitText({ text, className = "", delay = 0 }: SplitTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll(".split-char");
    
    gsap.fromTo(chars,
      { 
        opacity: 0,
        yPercent: 130,
        rotateX: -80,
        scale: 0.8
      },
      {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.03,
        ease: "expo.out",
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%"
        }
      }
    );
  }, [delay, text]);

  return (
    <div className="overflow-hidden" ref={containerRef as any}>
      <h2 className={className} style={{ perspective: "1000px" }}>
        {text.split("").map((char, index) => (
          <span 
            key={index} 
            className="split-char inline-block whitespace-pre origin-bottom"
          >
            {char}
          </span>
        ))}
      </h2>
    </div>
  );
}
