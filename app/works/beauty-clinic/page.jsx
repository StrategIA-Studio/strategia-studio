import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import BeautyClinic from "@/components/BeautyClinic";

export const metadata = {
  title: "StrategIA — Beauty Clinic",
};

export default function BeautyClinicPage() {
  return (
    <LenisProvider>
      <Navbar />
      <BeautyClinic />
    </LenisProvider>
  );
}
