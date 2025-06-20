// client/src/components/NavItems/PharmacyNavItem.jsx
"use client";
import React from "react";
import NavItem from "../NavItem";

export default function PharmacyNavItem() {
  return (
    <NavItem
      href="/pharmacy"
      label="Pharmacy"
      children={[
        { href: "/pharmacy/prescription", label: "Prescription Diet"  },
        { href: "/pharmacy/medicines",    label: "Medicines"          },
        { href: "/pharmacy/supplements",  label: "Supplements"        },
        { href: "/pharmacy/dewormers",    label: "Dewormers"          },
        { href: "/pharmacy/skin-care",    label: "Skin & Ear Care"    },
        { href: "/pharmacy/joint-care",   label: "Joint Care"         },
        { href: "/pharmacy/digestive",    label: "Digestive Care"     },
      ]}
    />
  );
}
