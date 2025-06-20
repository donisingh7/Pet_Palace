// client/src/components/NavItems/CatsNavItem.jsx
"use client";
import React from "react";
import NavItem from "../NavItem";

export default function CatsNavItem() {
  return (
    <NavItem
      href="/cats"
      label="Cat"
      children={[
        { href: "/cats/food",          label: "Cat Food"           },
        { href: "/cats/treats",        label: "Cat Treats"         },
        { href: "/cats/litter",        label: "Litter & Supplies"  },
        { href: "/cats/crates",        label: "Crates & Carriers"  },
        { href: "/cats/beds",          label: "Trees, Beds & Scratchers" },
        { href: "/cats/toys",          label: "Toys"               },
        { href: "/cats/grooming",      label: "Grooming"           },
        { href: "/cats/collars",       label: "Collars & Accessories"},
        { href: "/cats/bowls",         label: "Bowls & Diners"     },
        { href: "/cats/personalised",  label: "Personalised Products"},
        { href: "/pet-lovers",         label: "Pet Lovers"         },
      ]}
    />
  );
}
