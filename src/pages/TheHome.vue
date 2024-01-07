<script setup>

import {inject, reactive, watch, onMounted, ref} from 'vue'
import axios from 'axios'
import TheCardList from '../components/TheCardList.vue'
import orderBy from 'lodash/orderBy'

// Ref na produkty
const products = ref([]);

// Obiekt filtra z właściwościami sortBy i searchQuery
const filters = reactive({
    sortBy: '',
    searchQuery: '',
});
const {cart, addToCart, removeFromCart} = inject('cart');

const onClickAddCart = (item) => {

if (!item.isAdded) {

 addToCart(item);

} else {

 removeFromCart(item);

}

}

// Funkcja do zmiany sortowania
const onChangeSelect = event => {
    filters.sortBy = event.target.value;
    sortProducts(); // Sortowanie po zmianie sortowania
}

// Funkcja do zmiany zapytania wyszukiwania
const onChangeInput = (event) => {
    filters.searchQuery = event.target.value;
    sortProducts(); // Sortowanie po zmianie zapytania wyszukiwania
}

//Funkcja do przycisku Ulubionych "Favorite"
const fetchFavorites = async () =>{
    try{
        //dostajemy Card 
        const {data: favorites} = await axios.get(`https://fakestoreapi.com/products`);

        //Odświeżamy  dodajemy dwie właściwości  isFavorite, favoriteId
        products.value = products.value.map(item => {
                //sprawdzenie id produktu i id ulubionych
            const favorite = favorites.find(favorite => favorite.productId === item.id);


            if(!favorite) {
            return item;
        }

            return{
                ...item,
                isFavorite: true,
                favoriteId: favorite.id,
            };
        });



    }catch (err){
        console.log(err)
    }
};

const addToFavorite = async (item) => {
    try {
        if (!item.isFavorite) {
            item.isFavorite = true;
            // Dodawanie ulubionego produktu do listy lokalnej
            item.favoriteId = Date.now(); // Przykładowe nadanie identyfikatora ulubionemu produktowi

            // Zapisanie zmian w localStorage
            localStorage.setItem('favorites', JSON.stringify(products.value));
        } else {
            item.isFavorite = false;
            item.favoriteId = null;

            // Zapisanie zmian w localStorage
            localStorage.setItem('favorites', JSON.stringify(products.value));
        }
    } catch (err) {
        console.log(err);
    }
};


let originalProducts = [];

// Funkcja sortująca produkty
const sortProducts = () => {
    let sortedProducts = [...originalProducts]; // Utworzenie kopii oryginalnej listy produktów

    if (filters.sortBy === 'title') {
        sortedProducts = orderBy(sortedProducts, 'title', 'asc');
    } else if (filters.sortBy === 'priceLow') {
        sortedProducts = orderBy(sortedProducts, 'price', 'asc');
    } else if (filters.sortBy === 'priceHigh') {
        sortedProducts = orderBy(sortedProducts, 'price', 'desc');
    } else {
        return;
    }

    products.value = sortedProducts.filter(product => 
        product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
}



// Funkcja pobierająca produkty
const fetchItems = async () => {
    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products`);

        originalProducts = data;

        products.value = data.map((obj) => ({
            ...obj,
            isFavorite: false, 
            isAdded: false,
            favoriteId: null
        }));

        sortProducts(); // Sortowanie produktów po pobraniu
    } catch (err) {
        console.log(err);
    }

}



// Uruchomienie funkcji pobierającej produkty przy starcie komponentu
onMounted(async () => {
    
    const localCart = localStorage.getItem('cart');
    cart.value = localCart ? JSON.parse(localCart) : [];

    await fetchItems();
    await fetchFavorites();

    products.value = products.value.map((item) => ({
        ...item,
        isAdded: cart.value.some((CartItem) => CartItem.id === item.id)
    }));

    fetchFavorites
    
});


watch(filters, fetchItems)

watch(cart, () => {

products.value = products.value.map((item) => ({
    ...item,
    isAdded: false
}))

});



</script>

<template>

<div class="flex justify-between items-center">

<h2  class="text-3xl font-semibold uppercase">Products</h2>

<div class="flex gap-4">

    <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
                <option value="/">Sort</option>
                <option value="title">Name</option>
                <option value="priceLow">Price ++</option>
                <option value="priceHigh">Price --</option>
            </select>

<div class="relative">

    <img class="absolute left-4 top-3" src="/search.svg" alt="Search" />

    <input @input="onChangeInput" class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400 " placeholder="Search...">
           
</div>

</div>

</div>

<div class="mt-10">

<TheCardList :products="products" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddCart" />

</div>

</template>