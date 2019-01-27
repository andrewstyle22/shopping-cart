<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="(product, index) in products" :key="index">
        {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <!-- podemos crear un método o activar la acción directamente desde nuestra plantilla-->
    <button @click="checkout">Checkout</button>
    <p if="$store.state.checkoutStatus">{{ $store.state.checkoutStatus }}</p> <!-- Mostraremos el status de checkout-->
    <p v-if="checkoutStatus">{{checkoutStatus}}</p>
      <!--
        Este mensaje debería aparecer una vez el usuario intente
        procesar el pago, es decir, si checkoutStatus no es nulo.
        Podemos acceder al status de ckeckout en el store en vez
        de crear una propiedad computada
      -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('cart', {
      // El namespaced es el nombre del módulo. Así, que dentro de los getters
      // de mapeo podemos mapear products a cart/carProducts yo total a cart/cartTotal
      // products: 'cartProducts', Namespaced Vuex Modules 3:01
      // products: 'cart/cartProducts',
      products: 'cartProducts',
      // total: 'cart/cartTotal',
      total: 'cartTotal',
      // Sin embargo, esto puede llegar a se verboso  si se tiene muchos getters.
      // Afortunadamente, podemos pasar el namespace del módulo como primer argumento.
      // Entonces todas las relaciones se hacen usando el módulo como contexto.
      // y añadimos 'cart' al mapGetters => ...mapGetters('cart',. Con esto podemos eliminar
      // cart de cart/cartProducts y queda solo cartProducts

      // Puede existir la duda de cómo combiar getters con y sin namespaced asignado.
      // La solución es sencilla. Se puede tener una segunda llamada a mapGetters.
      // Por ejemplo, para mapear el getter productIsInStock del módulo products,
      // podemos hacer esto.
      // ...mapGetters('products', { // pasamos el namespaced
      //   productIsInStock: 'productsIsInStock'
      // }),
      // podemos llamar a mapGetters cuantas veces queramos. Los mismo se aplica para
      // mapActions y mapMutations.
    }),
    // comentamos este código pq mapeamos los getters Vuex Map Helpers 5:37
    // /* Devolverá el getter cartProducts */
    // products() {
    //   return this.$store.getters.cartProducts
    // },
    // total() {
    //   return this.$store.getters.cartTotal
    // },
    ...mapState('cart', {
      // checkoutStatus: 'checkoutStatus',
      // checkoutStatus: state => state.cart.checkoutStatus, // al crear cart.js
                              // y mover los métodos tenemos que llamarlo de esa forma
                              // Vuex Modules 4:59 lo cambiamos
      // Namespaced Vuex Modules 4:02 comentamos checkoutStatus: state => state.cart.checkoutStatus
      checkoutStatus: state => state.checkoutStatus,
      // hacemos lo mismo en con mapActions.
    }),
  },
  methods: {
    //...mapActions(['checkout']),// podemos pasar un objeto o un arreglo.
                                // Vas a la plantilla y reemplazas $store.dispatch('checkout')
    // Namespaced Vuex Modules 4:07 cambiamos ...mapActions(['checkout']), por
    // ...mapActions('cart', ['checkout']),
    ...mapActions('cart', ['checkout']),
  },
}
</script>
