<template>
  <div id="app">
    <product-list/>
    <hr>
    <!--
      Aquí normalmente pasaríamos una propiedad como products <shopping-cart :products/>
      pero ahora no es necesario, puesto que el componente ShoppingCart puede acceder a la
      tienda directamente.
      Recordemos que solo guardaremos el código del producto y la cantidad de nuestro
      carrito.
    -->

    <shopping-cart/>
  </div>
</template>

<script>
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';

export default {
  name: 'app',
  components: {
    ProductList,
    ShoppingCart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
