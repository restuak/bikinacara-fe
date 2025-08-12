
import Navbar from "@/components/navbar";
import BrowseCategories from "@/components/browsecategories";
import UpcomingEvents from "@/components/upcomingevents";
import ExploreCTA from "@/components/exploreCTA";
import Footer from "@/components/footer";

export default function HomeView() {
  return (
    <>
   
      <ExploreCTA />
      <UpcomingEvents />
      <BrowseCategories />
      <Footer />
    </>
  );
}
