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
      name: 'media-details',
      component: () => import('./components/Media'),
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('./components/AddMedia'),
    },
  ],
})
