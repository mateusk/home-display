import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/media',
      name: 'media',
      component: () => import('./components/MediaList'),
    },
    {
      path: '/media/:id',
      name: 'edit-media',
      component: () => import('./components/EditMedia'),
    },
    {
      path: '/add',
      name: 'add-media',
      component: () => import('./components/AddMedia'),
    },
  ],
})
