import { links} from "@/app/lib/data";
import React from "react";
import Header from "@/app/components/header";
import HamburgerMenu from "@/app/components/hamburger";

export default function Navbar() {
    return (
        <nav>
            <HamburgerMenu links={links} />
            <Header links={links} />
        </nav>
    )
}