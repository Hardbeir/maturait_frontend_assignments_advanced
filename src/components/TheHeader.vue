<script setup>


defineProps({
    totalPrice: Number
})

const emit = defineEmits(['openDrawer']);


</script>

<template>

<div class="flex justify-between border-b items-center border-slate-300 px-10 py-8">

    <router-link to="/">

        <div class="logo flex items-center gap-4">

            <img class="w-25" src="/logo.svg" alt="Logo">

            <div class="">
                
                <h2 class="text-xl font-bold uppercase">Shop</h2>
                <p class="text-slate-600">Straightforward e-commerce</p>

            </div>

        </div>

    </router-link>


<nav>

    <ul class=" flex items-center gap-10">

        <li @click="() => emit('openDrawer')" class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">

            <img src="/cart.svg" alt="Cart">
            <span class="font-semibold">{{ totalPrice.toFixed(2) }} $</span>

        </li>
        <router-link to="/favorites">
            <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">

                <img src="/heart.svg" alt="Favorite">
                <span class="font-semibold">Favorite</span>
            
            </li>
        </router-link>

    </ul>

</nav>


</div>
    
</template>