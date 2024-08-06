"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { animatePageOut } from "@/lib/animation";

interface TransitionLinkProps {
  href: string;
  label: string;
}

const TransitionLink = ({ href, label }: TransitionLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();

  const handleClick = (e: MouseEvent) => {
    const a = (e.target as Element).closest("a");
    if (a && a.target !== "_blank") {
      const href = a.getAttribute("href");

      if (!href) return;
      const [textWithoutHash, hash] = href.split("#");
      if (pathname !== textWithoutHash && !href.startsWith("#")) {
        e.preventDefault();
        router.prefetch(href);
        animatePageOut(href, router);
      } else if (pathname === textWithoutHash) {
        e.preventDefault();
        const element = document.getElementById(hash);
        const header = document.getElementById("header");
        const offset = header?.clientHeight || 0;
        lenis?.scrollTo(element || "#main", {
          offset: hash ? -offset : 0,
        });
      }
    }
  };

  return (
    <Link
      href={href}
      className="text-lg text-neutral-900 hover:text-neutral-700"
      onClick={handleClick}
    >
      {label}
    </Link>
  );
};

export default TransitionLink;
