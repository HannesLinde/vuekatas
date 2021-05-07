import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Kata4 from "../views/Kata4.vue";
import Kata1 from "../views/Kata1.vue";
import Kata2 from "../views/Kata2.vue";
import Kata3 from "../views/Kata3.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/kata4",
    name: "Kata 4",
    component: Kata4,
  },
  {
    path: "/kata1",
    name: "Kata 1",
    component: Kata1,
  },
  {
    path: "/Kata2",
    name: "Kata 2",
    component: Kata2,
  },
  {
    path: "/kata3",
    name: "Kata 3",
    component: Kata3,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
