import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
import SignIn from "../views/SignIn.vue";
import Root from '../views/Root.vue';
import Dashboard from '../views/Dashboard.vue';
import RetroBoard from '../views/RetroBoard.vue';
import { useAuth } from "../services/useAuth";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: 'Root',
    component: Root,
    redirect: { name: 'Dashboard' },
    beforeEnter: (to) => {
      if (to.name !== 'SignIn') {
        const { isSignedIn } = useAuth();
        if (!isSignedIn) {
          return { name: 'SignIn' }
        }
      }
    },
    children: [
      {
        path: "/dashboard",
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/retro/:id',
        name: 'RetroBoard',
        component: RetroBoard,
      }
    ]
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;