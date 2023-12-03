import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from './components/LoginComponent.vue';
import UserListComponent from './components/UserListComponent.vue'; // Import the new component
import ChatComponent from './components/ChatComponent.vue';

const routes = [
    { path: '/login', component: LoginComponent },
    { 
        path: '/users', // Update this line
        component: UserListComponent, // Update this line
        meta: { requiresAuth: true }
    },
    { 
        path: '/chat/:userId/:username', 
        name: 'Chat',
        component: ChatComponent,
        meta: { requiresAuth: true }
      },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !sessionStorage.getItem('user')) {
        next('/login');
    } else {
        next();
    }
});

export default router;