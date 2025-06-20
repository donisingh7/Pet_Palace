// client/src/components/NavItems/ConsultVetNavItem.jsx
"use client";
import React from "react";
import NavItem from "../NavItem";

export default function ConsultVetNavItem() {
  return (
    <NavItem
      href="/consult-a-vet"
      label="Consult a Vet"
      children={[
        { href: "/consult-a-vet/book",      label: "Book Appointment"    },
        { href: "/consult-a-vet/online",    label: "Online Consultation" },
        { href: "/consult-a-vet/directory", label: "Vet Directory"       },
        { href: "/consult-a-vet/emergency", label: "Emergency Care"      },
      ]}
    />
  );
}
