import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../components/Products.vue'
import ProductAddNew from '../components/ProductAddNew.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductAddNew,
  },
   
  {
    path: '/product',
    name: 'Product',
    component: Products
  },
  {
    path: '/addproduct',
    name: 'ProductAddNew',
    component: ProductAddNew

  }, 
  
 
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router