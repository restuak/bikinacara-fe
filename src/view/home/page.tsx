import Navbar from "@/components/navbar";
import BrowseCategories from "@/components/browsecategories";
import Footer from "@/components/footer";
import UpcomingEvents from "@/components/upcomingevents";
import ExploreCTA from "@/components/exploreCTA";

export default function HomeView() {
  return (
    <>
      <Navbar />
      <ExploreCTA />
      <UpcomingEvents />
      <BrowseCategories />
      <Footer />
    </>
  );
}
