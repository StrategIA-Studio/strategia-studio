import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import WorksPage from "@/components/WorksPage";

export const metadata = {
  title: "StrategIA — Works",
};

export default function Works() {
  return (
    <LenisProvider>
      <Navbar />
      <WorksPage />
    </LenisProvider>
  );
}
