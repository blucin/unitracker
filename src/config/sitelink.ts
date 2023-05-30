import type { MainNavItem, SidebarNavItem } from "~/types/nav";

interface NavConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const navConfig: NavConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Overview",
      items: [],
    },
    {
      title: "Subjects",
      items: [
        {
          title: "Create Subject",
          items: [],
        },
        {
          title: "Edit Subject",
          items: [],
        },
      ],
    },
    {
      title: "Timetables",
      items: [
        {
          title: "Create Timetable",
          items: [],
        },
        {
          title: "Edit Timetable",
          items: [],
        },
      ],
    },
  ],
};
