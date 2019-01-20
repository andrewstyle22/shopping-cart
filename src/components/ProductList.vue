<template>
  <div>
    <h1>Product List</h1>
    <img
      v-if="loading"
      src="https://i.imgur.com/JfPpwOA.gif" alt="">
    <ul v-else>
      <li v-for="(product, index) in products" :key="index">
      <!-- <li v-for="(product, index) in allProducts" :key="index"> este era como ejemplo -->
        {{ product.title }} - {{ product.price | currency }} - {{ product.inventory }}
        <!-- al añadir la propiedad computada productsInStock que nos devuelve
             el getter quitamos esto del button :disabled="!product.inventory > 0"
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
import { mapState, mapGetters, mapActions } from 'vuex'; // mapState devuelve un objecto, así que si necesitamos
                                 // que la opción computada incluya solo las propiedades
                                 // computadas para el estado puede usarse directamente
                                 // en la opción computada, de esta forma.


export default {
  // dado que los productos (products) están ahora almacenados globalmente
  // dentro del estado, por lo tando no necesitamos en el data,
  // como solo tenemos un solo elementos comentamos todo el data.
  // lo que necesitamos es una propiedad computada que retornará los
  // productos desde el estado
  data() {
    return {
      loading: false,
      productIndex: 1,
    }
  },
  computed: {
    // fusionar mapState
    ...mapState({
      products: state => state.products,
    }),
    // como declaramos products dentro del mapState, no necesitamos la propiedad
    // 'products' antigua
    // lista de productos
    // products() { //se comenta en Vídeo Vuex Map Helpers 4:36
    //   // return store.state.products;
    //   // return this.$store.getters.availableProducts; // Mostrar solo los productos
    //                                                    // que tenemos en existencia
    //   // ahora en el vídoe Dynamic Vuex Getters hacemos un cambio,
    //   // es mostrar todos los productos y desactivar el botón Añadir al carrito si
    //   //  el elemento se agota. Para empezar, reemplazamos el getter con stat.products
    //   // dentro de nuestra propidad computada

    //  return this.$store.state.products;
    // },
    ...mapGetters({
      productsInStock: 'productsInStock'
    }),
    // al mapear el getter commentamos lo de abajo
    // este devolverá el getter productsInStock
    // productsInStock() {
    //   return this.$store.getters.productsInStock;
    // },
  },
    /* Vídeo Vuex Map Helpers
    Cuando un componente necesita usar múltiples propiedaes del store y el estado (state)
    o gettersdeclarar todas estas propiedades computadas puede volverse repetitivo y excesivo.
    Imáginemos si tuviéramos quince getters o propiedades de estado. Para abordar este problema
    podemos usar los helpers de mapeo de Vuex. Los helpers de Vuex generan estas funciones por
    nosotros o mapean métodos de componentes para almacenar llamadas de despacho (store dispatch calls)

    mapState acepta un arreglo con las propiedades del estado para mapear o un objeto.
    Cuando se usa un arreglo, las propiedades computadas del componente tendrán los
    mismos nombres que las propiedades del estado, así que, en este ejemplo, nuestro
    componente tendrá una propiedad computada 'products' que contendrá todos los productos.
    Una necesida común cuando se mapea una propiedad del estado a una computada es usar un
    nombre de propiedad diferente. Para ello, podemos pasar un objeto. Así que, por ejemplo,
    podemos nombrar 'allProducts' a esta propiedad computada.

    Cambiamos en la plantila products por AllProducts

    También podemos usar funciones como valores en vez de un string.

  computed: mapState({
    // allProducts: 'products' // También podemos usar funciones como valores en vez de un string.
    //allProducts: state = state.products, // El estado (state) será pasado como primer argumento
    products: state => state.products,      // a la función. Una función es muy útil en ocasiones, si
    firstProduct: state.products[0],       // por ejemolo se quisiera obtener el primer producto.
                                           // Nótese que si se necesita acceder a datos locales,
                                           // usando esto, se tiene que usar una función normal en vez
                                           // de una función flecha
    specificProduct(state) {
      return state.products[this.productIndex]
    },
  }),*/
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
    // this.$store.dispatch('fetchProducts').then(() => this.loading = false);
    // // De esta manera desacoplamos los componentes de la lógica de la API
    // Vídeo Vuex Map Helpers 6:44
    // comentamos this.$store.dispatch('fetchProducts').then(() => this.loading = false);
    // y agregamos this.fetchProducts().then(() => this.loading = false);
    this.fetchProducts().then(() => this.loading = false);
  },
  methods: {
    // fucionar métodos locales
    // Helper mapActions maperá métodos locales a store.dispatch
    ...mapActions({
      fetchProducts: 'fetchProducts',// podemos usarlo escribiendo this.fetchProducts
                                     // porque de hecho estamos ejecutando
                                     // $store.dispatch('fetchProducts') en el fondo
                                     // fetchProducts la estamos usando en create()
                                     // la podemos reemplazar la llamada dispatch con
                                     // this.fetchProducts
      addProductToCart: 'addProductToCart', // comentamos el métodos addProductToCart(product)
    }),
    // addProductToCart(product) {
    //   this.$store.dispatch('addProductToCart', product)
    // }
  },
}
</script>

<style scoped>

</style>
