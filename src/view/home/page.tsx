import BrowseCategories from "@/components/browsecategories";
import UpcomingEvents from "@/components/upcomingevents";
import ExploreCTA from "@/components/exploreCTA";

export default function HomeView() {
  return (
    <>
      <ExploreCTA />
      <UpcomingEvents />
      <BrowseCategories />
    </>
  );
}
