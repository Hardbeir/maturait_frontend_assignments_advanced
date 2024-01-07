<script setup>

import {inject} from 'vue'

import CartItem from './subCartListItem.vue'

const {cart, removeFromCart} = inject('cart')

</script>

<template>

<div class="flex flex-1 flex-col gap-5" v-auto-animate>

<CartItem 
    v-for="item in cart" 
    :key="item.id" 
    :title="item.title" 
    :rating="item.price - item.rating.rate"
    :image="item.image"
    @on-click-remove="() => removeFromCart(item)"
/>


</div>
    

</template>