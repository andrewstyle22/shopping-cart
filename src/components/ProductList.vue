<template>
  <div>
    <h1>Product List</h1>
    <img
      v-if="loading"
      src="https://i.imgur.com/JfPpwOA.gif" alt="">
    <ul v-else>
      <li v-for="(product, index) in products" :key="index">
        {{ product.title }} - {{ product.price | currency }} - {{ product.inventory }}
        <!-- al añadir la propiedad computada productsInStock que nos devuelve
             el getter quitamos esto de button :disabled="!product.inventory > 0"
             y añadimos :disabled="!productsInStock(product)" y pasamos el product
             como argumento
        -->
        <button
          :disabled="!productsInStock(product)"
          @click="addProductToCart(product)">
          Add to Cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// import store from './store/index.js'; lo quitamos aquí y lo agregamos en main.js
// ahora es globar y reemplazamos store por this.$store
//import shop from '@/api/shop';  // al agregar store.dispatch('fetchProducts');
                                      // no necesitamos importar la tienda en el
                                      // componente


export default {
  // dado que los productos (products) están ahora almacenados globalmente
  // dentro del estado, por lo tando no necesitamos en el data,
  // como solo tenemos un solo elementos comentamos todo el data.
  // lo que necesitamos es una propiedad computada que retornará los
  // productos desde el estado
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    products() {
      // return store.state.products;
      // return this.$store.getters.availableProducts; // Mostrar solo los productos
                                                    // que tenemos en existencia
      /*ahora en el vídoe Dynamic Vuex Getters hacemos un cambio,
        es mostrar todos los productos y desactivar el botón Añadir al carrito si
        el elemento se agota. Para empezar, reemplazamos el getter con stat.products
        dentro de nuestra propidad computada
      */
     return this.$store.state.products;
    },
    // este devolverá el getter productsInStock
    productsInStock() {
      return this.$store.getters.productsInStock;
    },
  },
  created() { // Aquí solíamos actualizar la propiedad local de datos de products
              // pero ahora queremos actualizar los productos en el estado
              // Podrías pensar que en el lugar de this.products podemos usar
              // store.state.products = products y mientras que esto puede funcionar,
              // nunca deberías actualizar el estado directamente sin llamar a una
              // mutación
    // shop.getProducts(products => {
    //   //this.products = products;
    //   // store.state.products = products; es mejor llamar a una mutación
    //   // es decir, hacer commit de una mutación pasándole le nombre de la mutación,
    //   // la carga de los productos retornados
    //   store.commit('setProducts', products);

    // });
    // vamos a mover este código a action de esta manera no hay que repetir esta
    // función en todos los archivos que se esté utilizando products
    //------
    // Para activar una acción llamaremos al método store.dispatch
    // primer parámetro nombre de la acción y la segunda es el payload
    // store.dispatch('fetchProducts', 'toy') => pero se podría pasar una consulta del
    // tipo de productos a ubicar, por ejemplo  'toy'
    this.loading = true;
    this.$store.dispatch('fetchProducts').then(() => this.loading = false);
    // De esta manera desacoplamos los componentes de la lógica de la API
  },
  methods:{
    addProductToCart(product) {
      this.$store.dispatch('addProductToCart', product)
    }
  },
}
</script>

<style scoped>

</style>
