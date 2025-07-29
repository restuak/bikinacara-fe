import Navbar from "@/components/navbar";
import HomeView from "@/view/home/page";
import PopularEvents from "@/components/popularevents";
import BrowseCategories from "@/components/browsecategories";

export default function Home() {
  return (
    <>
      <Navbar />
      <PopularEvents />
      <BrowseCategories />
      <HomeView />
    </>
  );
}