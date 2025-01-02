"use client";
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Image from "next/image";

export default function NavBar() {
    return (
        <Navbar rounded={true} >
            <NavbarBrand as={Link} href="/">
                <Image src="https://i.ibb.co/WkqnW7R/OIP-1.jpg" priority width={30} height={30} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
                <NavbarLink href="#" active>
                    Home
                </NavbarLink>
                <NavbarLink as={Link} href="#">
                    About
                </NavbarLink>
                <NavbarLink href="#">Services</NavbarLink>
                <NavbarLink href="#">Pricing</NavbarLink>
                <NavbarLink href="#">Contact</NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
}
