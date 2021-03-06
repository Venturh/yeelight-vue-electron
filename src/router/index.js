import Vue from 'vue';
import VueRouter from 'vue-router';
import Devices from '../views/Devices.vue';
import Rooms from '../views/Rooms.vue';
import Scenes from '../views/Scenes.vue';
import Settings from '../views/Settings/Settings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Devices',
    component: Devices,
    alias: '/devices',
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: Rooms,
  },
  {
    path: '/scenes',
    name: 'Scenes',
    component: Scenes,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
