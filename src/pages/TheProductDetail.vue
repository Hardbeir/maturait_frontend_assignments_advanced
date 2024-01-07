<script setup>
  import { ref, onMounted, inject } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const product = ref(null);
  const { addToCart } = inject('cart');
  const cart = inject('cart'); // Pobranie dostępu do koszyka

  onMounted(async () => {
    const productId = route.params.id;
  
    try {
      const { data } = await axios.get(`https://fakestoreapi.com/products/${productId}`);
      product.value = data;
      checkIfInCart(); // Sprawdź, czy produkt jest już w koszyku po pobraniu danych produktu
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  });

  const isInCart = ref(false);

  const checkIfInCart = () => {
    if (product.value) {
      isInCart.value = cart.value.some(item => item.id === product.value.id);
    }
  };

  const onClickAddToCart = () => {
    if (product.value && !isInCart.value) {
      addToCart(product.value);
      isInCart.value = true;
    } else {
      console.log('This product is already in the cart!');
      // Tutaj możesz dodać informację dla użytkownika, że produkt jest już w koszyku
    }
  };
</script>

<template>
  <div class="flex flex-row items-center gap-10 m-10">
    <img v-if="product" :src="product.image" class="w-1/3" :alt="product.title" />

    <div class="flex flex-col gap-10">
      <h2 class="text-3xl font-semibold" v-if="product">{{ product.title }}</h2>
      <p class="text-xl" v-if="product">{{ product.description }}</p>
      <p class="text-xl" v-if="product">Price: <span>{{ product.price }}</span> $</p>
      <p class="text-xl" v-if="product">Rating: <span>{{ product.rating.rate }}</span> $</p>
      <button @click="onClickAddToCart" class="my-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" v-if="product && !isInCart">Add to Cart</button>
      <div v-else>Loading...</div>
    </div>
  </div>
</template>
