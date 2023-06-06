import type { MainNavItem, SidebarNavItem } from "~/types/nav";

interface NavConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const navConfig: NavConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Quick Navigation",
      items: [
        {
          title: "Dashboard",
          items: [],
          href: "/dashboard",
        },
        {
          title: "Home",
          items: [],
          href: "/",
        },
      ],
    },
    {
      title: "Subjects",
      items: [
        {
          title: "Create Subject",
          items: [],
          href: "/subject/create",
        },
        {
          title: "View/Edit Subject",
          items: [],
          href: "/subject",
        },
      ],
    },
    {
      title: "Timetables",
      items: [
        {
          title: "Create Timetable",
          items: [],
          href: "/timetable/create",
        },
        {
          title: "View/Edit Timetable",
          items: [],
          href: "/timetable",
        },
      ],
    },
    {
      title: "Exceptions",
      items: [
        {
          title: "Create Exceptions",
          items: [],
          href: "/exception/create",
        },
        {
          title: "View/Edit Exceptions",
          items: [],
          href: "/exception",
        },
      ],
    },
  ],
};
