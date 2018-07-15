import Vue from 'vue'
import Router from 'vue-router'

import Index from "@/pages/Index";
import Login from "@/pages/Login";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
