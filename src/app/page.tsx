import Navbar from "@/components/navbar";
import HomeView from "@/view/home/page";
import PopularEvents from "@/components/popularevents";

export default function Home() {
  return (
    <>
      <Navbar />
      <PopularEvents />
      <HomeView />
    </>
  );
}