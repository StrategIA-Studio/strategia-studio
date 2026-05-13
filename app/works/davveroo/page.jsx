import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import Davveroo from "@/components/Davveroo";

export const metadata = {
  title: "StrategIA — Davveroo",
};

export default function DavverooPage() {
  return (
    <LenisProvider>
      <Navbar />
      <Davveroo />
    </LenisProvider>
  );
}
