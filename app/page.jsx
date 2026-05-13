"use client";

import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import VerticalExperience from "@/components/VerticalExperience";

export default function Page() {
  return (
    <LenisProvider>
      <Navbar />
      <VerticalExperience />
    </LenisProvider>
  );
}
