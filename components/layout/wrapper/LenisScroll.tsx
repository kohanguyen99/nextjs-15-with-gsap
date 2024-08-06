"use client";
import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode } from "react";

interface LenisScrollProps {
  children: ReactNode;
}

const LenisScroll = ({ children }: LenisScrollProps) => {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });
  return (
    <ReactLenis
      root
      options={{
        // smoothWheel: false,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisScroll;
