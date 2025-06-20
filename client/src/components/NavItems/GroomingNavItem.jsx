// client/src/components/NavItems/GroomingNavItem.jsx
"use client";
import React from "react";
import NavItem from "../NavItem";


export default function GroomingNavItem() {
  return (
    <NavItem
      href="/grooming"
      label="Grooming"
      children={[
        { href: "/grooming/bath-spa",      label: "Bath & Spa"          },
        { href: "/grooming/haircuts",      label: "Haircuts"            },
        { href: "/grooming/nail-clipping", label: "Nail Clipping"        },
        { href: "/grooming/skin-coat",     label: "Skin & Coat"          },
        { href: "/grooming/dental",        label: "Dental Cleaning"      },
        { href: "/grooming/flea-tick",     label: "Flea & Tick Treatments"},
      ]}
    />
  );
}
