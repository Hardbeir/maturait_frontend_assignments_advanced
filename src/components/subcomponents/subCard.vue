<script setup>
  
defineProps({
  id: Number,
  image: String,
  title: String,
  price: Number,
  rating: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
});

// Tutaj mogą być jakieś dodatkowe funkcje lub logika związana z tym komponentem
</script>

<template>
    <div class="relative m-10 border border-slate-100 rounded-xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition delay-75 ease-in-out">
        <img class="absolute border border-gray-300 rounded top-8 left-8" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" @click="onClickFavorite" alt="Like">
        <div>
        <router-link :to="{ name: 'ProductDetails', params: { id: id } }">
        <img class="mt-10" :src="image" alt="{{title}}" />
        <p class="mt-2">{{ title }}</p>
        <div class="flex justify-between mt-5">
          <div class="flex flex-col">
            <span class="font-semibold text-slate-400">Price:</span>
            <span>{{ price }} $</span>
            <span class="font-semibold text-slate-400">Rating:</span>
            <span>{{ rating.toFixed(2) }} $</span>
          </div>
          </div>
        </router-link>
            </div>
            <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus" />
        </div>


  </template>
  

  