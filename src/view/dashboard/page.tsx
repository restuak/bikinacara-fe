
import SidebarMenuDashboard from "@/app/dashboard/components/sidebar/sidebar";
import ListEvent from "@/app/dashboard/components/view/listofevent";
import Navbar from "@/components/navbar";

export default function DashboardView() {
  return (
    <>
      <Navbar />
      <SidebarMenuDashboard />
      <ListEvent />
    </>
  );
}
