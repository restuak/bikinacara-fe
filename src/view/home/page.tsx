import Navbar from "@/components/navbar";
import PopularEvents from "@/components/upcomingevents";
import BrowseCategories from "@/components/browsecategories";
import FilterTab from "@/components/filtertab";
import EventGrid from "@/components/eventgrid";
import Footer from "@/components/footer";
import UpcomingEvents from "@/components/upcomingevents";

export default function HomeView() {
  return (
    <>
      <Navbar />
      <UpcomingEvents />
      <BrowseCategories />
      <FilterTab />
      <EventGrid />
      <Footer />
    </>
  );
}
