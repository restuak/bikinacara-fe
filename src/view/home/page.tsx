import Navbar from "@/components/navbar";
import BrowseCategories from "@/components/browsecategories";
import EventGrid from "@/components/eventgrid";
import Footer from "@/components/footer";
import UpcomingEvents from "@/components/upcomingevents";

export default function HomeView() {
  return (
    <>
      <Navbar />
      <UpcomingEvents />
      <BrowseCategories />
      <EventGrid />
      <Footer />
    </>
  );
}
