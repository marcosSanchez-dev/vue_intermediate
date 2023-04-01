export interface RouterLinks {
  path: string;
  name: string;
  title: string;
}

// ! Este array sirve para iterar en el componente NavBar y no se inlcuye dentro del router-vue

export const routeLinks: RouterLinks[] = [
  { path: "/", name: "home", title: "Inicio" },
  { path: "/about", name: "about", title: "Acerca de" },
  { path: "/characters", name: "characters", title: "Personajes" },
];
