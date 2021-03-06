import Vuex from 'vuex';
import Vue from 'vue';
// import shop from '@/api/shop'; comentamos shop porque ya se importa desde shop
import actions from './actions';
import cart from './modules/cart';
import products from './modules/products';

Vue.use(Vuex);

// Los stores de Vuex tienen cinco opciones
// State, mutations, getters, actions y modules
export default new Vuex.Store({
  modules: {
    cart,
    products,
  },
  // Vuex Modules 3:47 ahora tenemos los assets vacío en la tienda,
  // los mantenemos porqueaquí colocaríamos la lógica no relacionada
  // a un módulo. Además aquí podríamos tener la acción addProductToCart
  // que interactua con ambos módulos.
  state: { // = data
    // products: [], Vue Modules lo enviamos a products.js
    // {id, quantity } Solo almacenaremos objetos que contengan el
    // código y el número de items que el usuario desee comprar
    // necesitaremos una acción y una mutación para añadir el producto al carrito

    // Vuex Modules 0:54 mudamos cart y checkoutStatus al módulo cart.js
    // cart: [],
    // checkoutStatus: null,
  },
  getters: { // = computed properties global
    // por ejemplo queremos mostrar los productos que no están agotados
    // o calcular el total del carrito
    // al igual que las mutaciones, el primer parámetro es el estado,
    // además, Vuez pasa todos los getters existentes como el segundo parámetro.
    // Los getters rastrean sus propias dependencias y se actualizan automáticamente
    // cuando una dependencia cambia.
    // availableProducts(state, getters) {// Vuex Modules 2:31 mover a products.js
    //   return state.products.filter(product => product.inventory > 0);
    // },
    // Vuex Modules 1:04 mudamos cartProducts y cartTotal a cart.js
    // Obtener los productos del carrito
    // cartProducts(state) {
    //   return state.cart.map(cartItem => {
    //     const product = state.products.find(product => product.id === cartItem.id);
    //     return {
    //       title: product.title,
    //       price: product.price,
    //       quantity: cartItem.quantity
    //     }
    //   })
    // },
    // cartTotal(state, getters) {
    //   // let total = 0;
    //   // getters.cartProducts.forEach(product => {
    //   //   total += product.price * product.quantity;
    //   // });
    //   // return total;
    //   // lo de arriba es igual a lo de abajo
    //   return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    // },
    /* Los getters no aceptan argumentos de forma predeterminada, pero podemos
       pasarle argumentos a los getters devolviendo una función
    */
    // productsInStock(state) {// Vuex Modules 2:41 mover a products.js
    //   // Nos devolverá una función que aceptará un producto como un argumento
    //   // En lugar de pasar un producto, podemos pasar su código com argumento
    //   // y tomar el producto del estado, aunque basta con pasar el objeto product
    //   // usaremos este getter en ProductList
    //   return (product) => {
    //     return product.inventory > 0;
    //   }
    // },
  },
  actions,
  // En Split Vuex Store in Multiple Files comentamos actions y creamos actions.js
  // para separar código y colocamos actions: actions, o solo actions,
  // actions: { // = métodos, aquí realizamos la llamada al api
  //            // Las acciones son métodos del store
  //            // caundo necesitamos ubicar los productos desde una API
  //            // creamos una acción para ello
  //            // Las acciones son usualmente asíncronas (ejemplo: AJAX)
  //   // Vuex automáticamente pasa el objeto context como primer parámetro
  //   // a todas sus acciones.
  //   // El objeto context provee el mismo conjunto de métodos y propiedades
  //   // que el objeto store. Esto significa que podemos usar:
  //   // context.commit para activar una mutación
  //   // context.state para acceder al estado
  //   // Las acciones también son responsables de la lógica implícita,
  //   // en la activación de una mutación
  //   // fetchProducts(context) { // podemos usar la desestructuración
  //                            // para solo tomar el método commit del objeto ccontext
  //   fetchProducts({commit}) {
  //     // make the call
  //     // then run setProducts mutations
  //     // Las acciones son usualmente asíncronas necesitamos saber cuando
  //     // se realiza una acción,para ello, podemos devolver una promesa de nuestra
  //     // acción y manejarla luego con store.dispatch
  //     return new Promise((resolve, reject) => {
  //       shop.getProducts(products => {
  //         // store.commit('setProducts', products);
  //         //context.commit('setProducts', products);
  //         commit('setProducts', products)
  //         resolve()
  //       });
  //     })
  //   },
  //   // las acciones es responsables por la lógica implicada en la activación
  //   // de una mutación
  //   // addProductToCart(context, product) {
  //   addProductToCart({ state, getters, commit }, product) {
  //     // A partir del vídeo Dynamic Vuex Getters 1.46
  //     // Usaremos el getter dentro de la acción addProductToCart, en vez de
  //     // de seguir repitiendo. Dentro de la acción, podemos acceder a los getters
  //     // bajo context.getters, reemplazaremos if(product.inventory > 0) por
  //     // if (context.getters.productsInStock(product))
  //     // después con desestructuración de argumentos
  //     // para tomar solo las propiedades necesarias del contexto
  //     if (getters.productsInStock(product)) {
  //       const cartItem = state.cart.find(item => item.id === product.id);
  //       if(!cartItem) {
  //         // si el item no existe lo añadiremos al carrito
  //         commit('pushProductToCart', product.id);
  //       } else {
  //         // Si el cartItem existe, haremos commit de otra mutación
  //         commit('incrementItemQuantity', cartItem);
  //       }
  //       commit('decrementProductInventory', product);
  //     }
  //   },
  //   // Utilizaremos desestructuración de argumentos de ES6, para tomar solo las
  //   // propiedades que necesitamos del contexto (context), state y commit
  //   // checkout(context) {
  //   checkout({ state, commit }) {
  //     shop.buyProducts(
  //       state.cart,
  //       // El siguiente argumento es la función callback a ejecutar si hay éxito
  //       () => {
  //         commit('emptyCart')
  //         commit('setCheckoutStatus', 'success')
  //       },
  //       // este argumento es si falla al ejecutar
  //       () => {
  //         commit('setCheckoutStatus', 'fail')
  //       }
  //     )
  //   },
  // },
  mutations: { // responsables de establecer y actualizar el estado
    // Las mutationes son responsables de cambios de estado individuales.
    // Un cambio de estado individual podría ser actualizar
    // el arreglo products en nuestro store
    // queremos establecer el array products, pues tenemos que llamar a
    // setProducts
    // Vuex automáticamente pasará el estado como primer parámetro,
    // podemos pasar un parámetro adicional, al llamar a una mutación
    // que será la carga (En este ejemplo es productos)
    // el propósito de la mutaciones no es obtener datos
    // o hacer cálculos complejos sino alterar el estado
    // setProducts(state, products) {// Vuex Modules 2:37 mover a products.js
    //   // update products
    //   state.products = products; // actualizamos el estado de products en la carga
    // },
    // Vuex Modules 1:31 mudamos pushProductToCart, incrementItemQuantity,
     // setCheckoutStatus y emptyCart a cart.js
    // decrementProductInventory no porque está relacionado con el producto
    // No necesitamos conocer realmente el código de cada mutación, porque cada
    // mutación posee una única responsabilidad de cambiar el estado
    // pushProductToCart(state, productId) {
    //   state.cart.push({
    //     id: productId,
    //     quantity:1
    //   })
    // },
    // incrementItemQuantity(state, cartItem){
    //   cartItem.quantity++;
    // },
    // decrementProductInventory(state, product){// Vuex Modules 2:37 mover a products.js
    //   product.inventory--;
    // },
    // setCheckoutStatus(state, status) {
    //   state.checkoutStatus = status; // al status pasado
    // },
    // emptyCart(state) {// esta mutación no requiere parámetros, puesto que solo
    //                   // reinicia el carrito fijando state.cart a un arreglo vacío
    //   state.cart = [];
    // },
  }
});

