"use client";

import { useFrame } from "@/lib/hooks/use-frame";
import { useEffect, useMemo, useRef } from "react";
import { useWindowSize } from "usehooks-ts";

export function Noise() {
  const el = useRef<HTMLDivElement>(null);

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const canvas = useMemo(() => document.createElement("canvas"), []);
  const buffer = useMemo(() => document.createElement("canvas"), []);
  const context = useMemo(() => canvas.getContext("2d"), []);

  useEffect(() => {
    if (!el.current) return;
    el.current.appendChild(canvas);

    return () => {
      canvas.remove();
    };
  }, [canvas]);

  useEffect(() => {
    if (!context) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const width = windowWidth;
    const height = windowHeight;

    canvas.width = width;
    canvas.height = height;

    const image = context.createImageData(width * dpr, height * dpr);
    const buffer32 = new Uint32Array(image.data.buffer);

    for (let i = 0; i < buffer32.length; i++) {
      if (Math.random() < 0.5) buffer32[i] = 0xffffffff;
    }

    buffer.width = width;
    buffer.height = height;
    const contextBuffer = buffer.getContext("2d");
    if (contextBuffer) {
      contextBuffer.putImageData(image, 0, 0);
    }
  }, [buffer, windowWidth, windowHeight]);

  useFrame(() => {
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      buffer,
      -Math.random() * 200,
      -Math.random() * 200,
      canvas.width + 200,
      canvas.height + 200
    );
  });

  return (
    <div
      ref={el}
      className="pointer-events-none fixed inset-0 z-[99999] h-screen w-full opacity-[0.06]"
    />
  );
}
