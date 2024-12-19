const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/popisKnjiga",
        component: () => import("pages/PopisKnjigaPage.vue"),
      },
      {
        path: "/pretrazivanje",
        component: () => import("pages/TraziKnjiguPage.vue"),
      },
      { path: "/o_nama", component: () => import("pages/ONamaPage.vue") },
      { path: "/lokacija", component: () => import("pages/LokacijaPage.vue") },
      { path: "/login", component: () => import("pages/LoginPage.vue") },
      {
        path: "/registracija",
        component: () => import("pages/RegistracijaPage.vue"),
      },
      { path: "/popis_knjiga_baza", component: () => import("pages/PopisKnjigaBazaPage.vue") },
      { path: "/rezervirane_knjige", component: () => import("pages/RezervacijePage.vue") },
    ]
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/admin/popisKnjiga",
        component: () => import("pages/PopisKnjigaPage.vue"),
      },
      {
        path: "/admin/pretrazivanje",
        component: () => import("pages/TraziKnjiguPage.vue"),
      },
      { path: "/admin/popis_knjiga_baza", component: () => import("pages/PopisKnjigaBazaPage.vue") },
      { path: "/admin/popis_korisnika", component: () => import("pages/PopisKorisnikaPage.vue") },
      { path: "/admin/rezervirane_knjige", component: () => import("pages/RezervacijePage.vue") },
      { path: "/admin/unos_knjige", component: () => import("pages/UnosKnjigaPage.vue") },
      { path: "/admin/logout", component: () => import("pages/AdminLogout.vue") },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
