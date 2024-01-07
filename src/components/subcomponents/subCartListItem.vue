<script setup>

const emit = defineEmits(['onClickRemove'])

defineProps({

    id: Number,
    image: String,
    title: String,
    price: Number,
    rating: Number

})

</script>

<template>

<div class="w-full flex items-center border border-slate-100 p-4 rounded-xl gap-4">

    <img class="w-16 " :src="image" :alt="title">

    <div class="flex flex-col flex-1">

        <p>{{ title }}</p>

        <div class=" flex justify-between mt-2">
            
            <b class="flex-1">{{ rating.toFixed(2) }} $</b>

            <img @click="emit('onClickRemove')" class="opacity-40 hover:opacity-100 cursor-pointer transition" src="/close.svg" alt="">

        </div>

    </div>
    

</div>

</template>