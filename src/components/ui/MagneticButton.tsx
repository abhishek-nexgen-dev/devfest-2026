import React, { useRef } from "react";
import gsap from "gsap";
import { soundFx } from "../../utils/audio";

interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  target?: string;
  rel?: string;
  as?: "a" | "button" | "div";
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  strength = 0.3,
  href,
  target,
  rel,
  as,
  onClick,
  ...props
}) => {
  const elRef = useRef<any>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!elRef.current) return;
    const rect = elRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(elRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!elRef.current) return;
    gsap.to(elRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    soundFx.playClick(900);
    if (onClick) onClick(e);
  };

  const commonProps = {
    ref: elRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    className: `inline-flex items-center justify-center transition-colors select-none ${className}`,
    ...props,
  };

  // If no href is provided and 'as' is not explicitly 'a', render as a div wrapper to prevent nested <a> tags
  if (as === "div" || (!href && as !== "a" && as !== "button")) {
    return (
      <div {...commonProps}>
        {children}
      </div>
    );
  }

  if (as === "button") {
    return (
      <button type="button" {...commonProps}>
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      {...commonProps}
    >
      {children}
    </a>
  );
};

