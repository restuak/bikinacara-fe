import Navbar from "@/components/navbar";
import PopularEvents from "@/components/popularevents";
import BrowseCategories from "@/components/browsecategories";
import FilterTab from "@/components/filtertab";
import EventGrid from "@/components/eventgrid";
import Footer from "@/components/footer";

export default function HomeView() {
  return (
    <>
      <Navbar />
      <PopularEvents />
      <BrowseCategories />
      <FilterTab />
      <EventGrid />
      <Footer />
    </>
  );
}
