// client/src/components/NavItems/DogsNavItem.jsx
import React from "react";
import NavItem from "../NavItem";

export default function DogsNavItem() {
  return (
    <NavItem
      href="/dogs"
      label="Dogs"
      children={[
       { href: "/dogs/food",        label: "Food"        },
       { href: "/dogs/toys",        label: "Toys"        },
       { href: "/dogs/grooming",    label: "Grooming"    },
       { href: "/dogs/accessories", label: "Accessories" },
       { href: "/dogs/health",      label: "Health"      },
      ]}
    />
  );
}
