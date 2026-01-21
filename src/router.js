import { createRouter, createWebHistory } from 'vue-router';
import SelectionPage from './SelectionPage.vue';
import App from './App.vue';
import Main from './Main.vue';

const routes = [
    {
        path: '/',
        name: 'Selection',
        component: SelectionPage,
    },
    {
        path: '/app',
        name: 'Main',
        component: Main,
    },
];

const router = createRouter({
    history : createWebHistory(), routes,
});

export default router;