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
    <p if="$store.state.checkoutStatus">{{ $store.state.checkoutStatus }}</p> <!-- Mostraremos el status de checkout -->
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
    ...mapGetters({
      products: 'cartProducts',
      total: 'cartTotal',
    }),
    // comentamos este código pq mapeamos los getters Vuex Map Helpers 5:37
    // /* Devolverá el getter cartProducts */
    // products() {
    //   return this.$store.getters.cartProducts
    // },
    // total() {
    //   return this.$store.getters.cartTotal
    // },
    ...mapState({
      checkoutStatus: 'checkoutStatus',
    }),
  },
  methods: {
    ...mapActions(['checkout']),// podemos pasar un objeto o un arreglo.
                                // Vas a la plantilla y reemplazas $store.dispatch('checkout')
  },
}
</script>
