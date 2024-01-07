<script setup>

import {inject} from 'vue'

const {closeDrawer} = inject('cart');

defineProps({
    title: String,
    description: String,
    image: String
})

</script>

<template>

    <div class="flex flex-col items-center text-center w-72 mx-auto">

    <img height="70" width="70" :src="image" alt="Cart empty" />
    <h2 class="mt-4 text-2xl font-medium"> {{ title }} </h2>
    <p class="text-gray-400"> {{ description }} </p>
    <button class="bg-lime-500 w-full rounded-xl py-3 mt-6
        text-white hover:bg-lime-600 transition
        active:bg-lime-700 disabled:bg-slate-400
        cursor-pointer" @click="closeDrawer">Close</button>

    </div>

</template>