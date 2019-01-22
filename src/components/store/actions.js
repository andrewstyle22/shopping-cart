import shop from '@/api/shop';

export default {
            // = métodos, aquí realizamos la llamada al api
            // Las acciones son métodos del store
            // caundo necesitamos ubicar los productos desde una API
            // creamos una acción para ello
            // Las acciones son usualmente asíncronas (ejemplo: AJAX)
  // Vuex automáticamente pasa el objeto context como primer parámetro
  // a todas sus acciones.
  // El objeto context provee el mismo conjunto de métodos y propiedades
  // que el objeto store. Esto significa que podemos usar:
  // context.commit para activar una mutación
  // context.state para acceder al estado
  // Las acciones también son responsables de la lógica implícita,
  // en la activación de una mutación
  // fetchProducts(context) { // podemos usar la desestructuración
                            // para solo tomar el método commit del objeto ccontext
  // fetchProducts({commit}) {// Vuex Modules 3:10 mover a products.js
  //   // make the call
  //   // then run setProducts mutations
  //   // Las acciones son usualmente asíncronas necesitamos saber cuando
  //   // se realiza una acción,para ello, podemos devolver una promesa de nuestra
  //   // acción y manejarla luego con store.dispatch
  //   return new Promise((resolve, reject) => {
  //     shop.getProducts(products => {
  //       // store.commit('setProducts', products);
  //       //context.commit('setProducts', products);
  //       commit('setProducts', products)
  //       resolve()
  //     });
  //   })
  // },
  // // Vuex Modules 1:53 lo movemos a cart.js
  // // las acciones es responsables por la lógica implicada en la activación
  // // de una mutación
  // // addProductToCart(context, product) {
  // addProductToCart({ state, getters, commit }, product) {
  //   // A partir del vídeo Dynamic Vuex Getters 1.46
  //   // Usaremos el getter dentro de la acción addProductToCart, en vez de
  //   // de seguir repitiendo. Dentro de la acción, podemos acceder a los getters
  //   // bajo context.getters, reemplazaremos if(product.inventory > 0) por
  //   // if (context.getters.productsInStock(product))
  //   // después con desestructuración de argumentos
  //   // para tomar solo las propiedades necesarias del contexto
  //   if (getters.productsInStock(product)) {
  //     const cartItem = state.cart.find(item => item.id === product.id);
  //     if(!cartItem) {
  //       // si el item no existe lo añadiremos al carrito
  //       commit('pushProductToCart', product.id);
  //     } else {
  //       // Si el cartItem existe, haremos commit de otra mutación
  //       commit('incrementItemQuantity', cartItem);
  //     }
  //     commit('decrementProductInventory', product);
  //   }
  // },
  // // Utilizaremos desestructuración de argumentos de ES6, para tomar solo las
  // // propiedades que necesitamos del contexto (context), state y commit
  // // checkout(context) {
  // checkout({ state, commit }) {
  //   shop.buyProducts(
  //     state.cart,
  //     // El siguiente argumento es la función callback a ejecutar si hay éxito
  //     () => {
  //       commit('emptyCart')
  //       commit('setCheckoutStatus', 'success')
  //     },
  //     // este argumento es si falla al ejecutar
  //     () => {
  //       commit('setCheckoutStatus', 'fail')
  //     }
  //   )
  // },
}
