import {
  Calendar,
  Home,
  BadgeDollarSign,
  ChartArea,
  ClipboardPlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";


const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "List of Events",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Transactions",
    url: "#",
    icon: BadgeDollarSign,
  },
  {
    title: "Statistics",
    url: "#",
    icon: ChartArea,
  },
  {
    title: "Report",
    url: "#",
    icon: ClipboardPlus,
  },
];

export default function SidebarMenuDashboard() {
  return (
      <Sidebar className="pt-17">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Bikin Acara - Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  );
}
