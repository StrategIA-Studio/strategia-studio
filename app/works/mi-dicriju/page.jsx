import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import MiDicriju from "@/components/MiDicriju";

export const metadata = {
  title: "StrategIA — Mi Dicriju",
};

export default function MiDicrijuPage() {
  return (
    <LenisProvider>
      <Navbar />
      <MiDicriju />
    </LenisProvider>
  );
}
