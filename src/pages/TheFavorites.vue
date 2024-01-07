<script setup>
  import { ref, onMounted } from 'vue';
  import TheCardList from '../components/TheCardList.vue';
  
  const favoriteProducts = ref([]);
  
  const fetchFavorites = async () => {
    try {
      // Pobierz ulubione produkty z localStorage lub z serwera
      const localFavorites = localStorage.getItem('favorites');
      const favorites = localFavorites ? JSON.parse(localFavorites) : [];
  
      // Filtrowanie tylko ulubionych produktów
      favoriteProducts.value = favorites.filter(item => item.isFavorite);
    } catch (err) {
      console.error(err);
    }
  };
  
  const toggleFavorite = (item) => {
    const index = favoriteProducts.value.findIndex((favItem) => favItem.id === item.id);

    if (index === -1) {
        item.isFavorite = true;
        favoriteProducts.value.push(item);
    } else {
        item.isFavorite = false;
        favoriteProducts.value.splice(index, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favoriteProducts.value));
};
  
  onMounted(() => {
    fetchFavorites();


  });
  </script>

<template>
    <div>
      <h2 class="text-3xl font-semibold uppercase">Favorites</h2>
      <div class="mt-10">
        <TheCardList :products="favoriteProducts" @add-to-favorite="toggleFavorite" />
      </div>
    </div>
  </template>
  