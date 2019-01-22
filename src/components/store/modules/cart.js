import shop from "@/api/shop";

export default {
  state: {
    //cart: [], //Vue modules 5:37 cambiamos el nombre para hacerlo más acorde
    items: [],
    checkoutStatus: null,
    // Vue Modules 6:00
    // Local state es todo lo que está dentro de la opción state.
    // Cada vez que necesitemos acceder al estado fuera del módulo
    // necesitamos hacer referencia al estado global, también conocido
    // como estado padre (rootState)
    // El rootState está expuesto en acciones como context.rootState
    // añadimos rootSate como otro argumento en actions => addProductToCart
    // en getters, Vuex pasa el rootState como tercer argumento
    // le añadimos getters y rootState a cartProducts
  },
  getters: {
    cartProducts(state, getters, rootState) {
      // rootState => De esta forma podemos acceder a todos los productos bajo
      // rootState.products.items
      return state.items.map(cartItem => {
        // Vue Modules 6:59 cambimos state.products por rootState.products.items
        // const product = state.products.find(product => product.id === cartItem.id);
        const product = rootState.products.items.find(product => product.id === cartItem.id);
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    //Vue Modules 7:05 no se cambia porque depende del getter cartProducts
    cartTotal(state, getters) {
      // let total = 0;
      // getters.cartProducts.forEach(product => {
      //   total += product.price * product.quantity;
      // });
      // return total;
      // lo de arriba es igual a lo de abajo
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    },
  },
  mutations: {
    pushProductToCart(state, productId) {
      state.items.push({
        id: productId,
        quantity:1
      })
    },
    incrementItemQuantity(state, cartItem){
      cartItem.quantity++;
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status; // al status pasado
    },
    emptyCart(state) {// esta mutación no requiere parámetros, puesto que solo
                      // reinicia el carrito fijando state.cart a un arreglo vacío
      state.items = [];
    },
  },
  actions: {
    addProductToCart({ state, getters, commit, rootState }, product) {
      if (getters.productsInStock(product)) {
        const cartItem = state.items.find(item => item.id === product.id);
        if(!cartItem) {
          // si el item no existe lo añadiremos al carrito
          commit('pushProductToCart', product.id);
        } else {
          // Si el cartItem existe, haremos commit de otra mutación
          commit('incrementItemQuantity', cartItem);
        }
        commit('decrementProductInventory', product);
      }
    },
    checkout({ state, commit }) {
      shop.buyProducts(
        state.items,
        // El siguiente argumento es la función callback a ejecutar si hay éxito
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        // este argumento es si falla al ejecutar
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    },
  },
}
