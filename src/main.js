import './assets/main.css'

import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'


import Home from './pages/TheHome.vue'
import Favorites from './pages/TheFavorites.vue'
import ProductDetails from './pages/TheProductDetail.vue'

const app = createApp(App)


const routes = [
    {path: "/", name:'Home', component: Home},
    {path: "/favorites", name:'Favorites', component: Favorites},
    {path: '/product/:id', name: 'ProductDetails', component: ProductDetails}, // Parametr ":id" pozwoli na dynamiczne pobieranie ID produktu
]

const router = createRouter({
    history: createWebHistory(),
    routes, 
  })


  
app.use(router)

app.use(autoAnimatePlugin)

app.mount('#app')
