import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
    { path: '/issue/:slug', name: 'issue', component: () => import('./views/IssueView.vue') },
    { path: '/map', name: 'map', component: () => import('./views/MapView.vue') },
    { path: '/ask', name: 'ask', component: () => import('./views/AskView.vue') },
    { path: '/parent', name: 'parent', component: () => import('./views/ParentView.vue') },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
