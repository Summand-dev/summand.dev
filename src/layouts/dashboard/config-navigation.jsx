import SvgColor from "src/components/svg-color";
import Iconify from "../../components/iconify";

// ----------------------------------------------------------------------

const icon = (name) => <Iconify width={1} icon={name}></Iconify>;

const navs = [
  {
    title: "Dashboard",
    path: "",
    icon: icon("ic:twotone-dashboard"),
  },
  {
    title: "Settings",
    path: "setting",
    icon: icon("solar:settings-bold-duotone"),
  },
];

const navConfig = (role) => {
  return {
    admin: [navs[0], navs[1]],
    viewer: [navs[1]],
  }[role];
};

export default navConfig;
