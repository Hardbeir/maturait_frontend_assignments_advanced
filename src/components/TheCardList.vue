<script setup>

import Cart from './subcomponents/subCard.vue'

defineProps({
    products: Array
});

const emit = defineEmits(['addToFavorite', 'addToCart']);


</script>

<template>
        <div class="grid grid-cols-4 gap-5 mt-8 max-md:grid-cols-1" v-auto-animate>

            <Cart 
                v-for="item in products"
                :key="item.id"
                :id="item.id"
                :image="item.image" 
                :title="item.title" 
                :price="item.price"
                :rating="item.price - item.rating.rate"
                :onClickFavorite = "() => emit('addToFavorite', item)"
                :onClickAdd="() => emit('addToCart', item)"
                :isFavorite="item.isFavorite"
                :isAdded="item.isAdded"
            />

        </div>
</template>