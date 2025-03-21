import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CalendarView from '@/views/CalendarView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/calendar', component: CalendarView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
