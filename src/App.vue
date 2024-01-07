<script setup>
import { provide, watch, ref, computed } from 'vue'

// Importy komponentów
import TheHeader from './components/TheHeader.vue'

import TheDrawer from './components/TheDrawer.vue'

/* Cart start*/


// Ref na kosz, lista produktów

const cart = ref([]);

const isCreatingOrder = ref(false);

const drawerView = ref(false);

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + (item.price - item.rating.rate), 0));

const totalRating = computed(() => cart.value.reduce((acc, item) => acc - item.rating.rate, 0));

const closeDrawer = () => {

    drawerView.value = false;

}

const openDrawer = () => {

    drawerView.value = true;

}



const removeFromCart = (item) => {

    cart.value.splice(cart.value.indexOf(item), 1)
    item.isAdded = false

}

const addToCart = (item) => {

    cart.value.push(item)
    item.isAdded = true

}

const createOrder = () => {
    try {
        // Pobranie danych z koszyka
        const orderData = {
            products: cart.value,
            totalPrice: totalPrice.value,
        };

        isCreatingOrder.value = true
        // Pobranie istniejących zamówień lub inicjalizacja pustej listy
        const existingOrders = JSON.parse(localStorage.getItem('./assets/orderCart')) || [];

        // Dodanie nowego zamówienia do listy
        existingOrders.push(orderData);

        // Zapisanie zaktualizowanej listy zamówień w localStorage
        localStorage.setItem('./assets/orderCart', JSON.stringify(existingOrders));

        // Wyczyszczenie koszyka
        cart.value = [];
        console.log(orderData);

        return orderData;

    } catch (err) {
        console.error(err);
        
    } finally{
        isCreatingOrder.value = false
    }

};

watch(cart, () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
},
{deep: true})


provide('cart', {
    cart,
    closeDrawer,
    openDrawer,
    addToCart,
    removeFromCart
});

/* Cart End */


</script>

<template>

    <TheDrawer 
    v-if="drawerView" 
    :total-price="totalPrice" 
    :total-rating="totalRating" 
    @create-order="createOrder" 
    :is-creating-order="isCreatingOrder" 
    /> 
    

<div class="w-4/5 m-auto bg-white rounded-xl shadow-xl my-14">
    
    <TheHeader :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">

        <router-view></router-view>

    </div>

    </div>

</template>



