<script setup>
import {computed} from 'vue'

import DrawerHeader from './subcomponents/subDrawerHeader.vue'
import CartList from './subcomponents/subCartList.vue'
import subInfoBlock from './subcomponents/subInfoBlock.vue';

const emit = defineEmits(['createOrder'])

const props = defineProps({
    totalPrice: Number,
    totalRating: Number,
    isCreatingOrder: Boolean
})

const buttonDisabled = computed(() => props.isCreatingOrder.value ? true : props.totalPrice ? false : true);

</script>

<template>

<div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>

<div class="fixed right-0 top-0 w-96 h-full z-20 bg-white p-8">

    <DrawerHeader/>

    <div v-if="!totalPrice" class="flex h-full items-center">
        <subInfoBlock  title="Cart Empty" description="...." image="/package-icon.png" />
    </div>

<div class="" v-else>

    <CartList />

<div class="flex flex-col gap-5 my-7">

    <div class="flex flex-col gap-2">
        <span>Summary:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <span class="font-bold">{{ totalPrice.toFixed(2) }} $</span>

        <span>Rating: </span>
        <div class="flex-1 border-b border-dashed"></div>
        <span class="font-bold">{{ totalRating.toFixed(2) }} $</span>
    </div>

    <button :disabled="buttonDisabled" 
    class="bg-lime-500 w-full rounded-xl py-3 mt-6
    text-white hover:bg-lime-600 transition
    active:bg-lime-700 disabled:bg-slate-400
    cursor-pointer" @click="() => emit('createOrder')">Order</button>
    
</div>
</div>



</div>

</template>