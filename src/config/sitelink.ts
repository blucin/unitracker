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
          title: "Add Subject",
          items: [],
          href: "/subject/create",
        },
        {
          title: "Edit Subject",
          items: [],
          href: "/subject",
        },
      ],
    },
    {
      title: "Timetables",
      items: [
        {
          title: "Add Timetable",
          items: [],
          href: "/timetable/create",
        },
        {
          title: "Edit Timetable",
          items: [],
          href: "/timetable",
        },
      ],
    },
    {
      title: "Exceptions",
      items: [
        {
          title: "Add Exceptions",
          items: [],
          href: "/exception/create",
        },
        {
          title: "Edit Exceptions",
          items: [],
          href: "/exception",
        },
      ],
    },
  ],
};
