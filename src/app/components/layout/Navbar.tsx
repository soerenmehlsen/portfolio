import { links } from "@/app/lib/data";
import React from "react";
import Header from "@/app/components/layout/Header";
import HamburgerMenu from "@/app/components/layout/Hamburger";

export default function Navbar() {
  return (
    <nav>
      <HamburgerMenu links={links} />
      <Header links={links} />
    </nav>
  );
}
