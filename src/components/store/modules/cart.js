import shop from "@/api/shop";

export default {
  // Queremos que nuestrso módulos tengan mejor conexión o
  // protección podemos marcarlos dentro de un nombre de
  // espacio (namespaced), Para ello, tenemos que establecer
  // la opción namespaced a true, esto hará que cuando lancemos
  // la apliación veremos en Vuex en getters cart/cartProducts,
  // cart/cartTotal.
  namespaced: true,
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
  // Lo bueno es que los getters y acciones con namespaced
  // recibirán getters, dispatch y commits localizados. En
  // otras palabras, se pueden usar los assets del módulo
  // sin escribir el prefijo cuando se está en el mismo
  // módulo. Por tanto, alterar entre un namespaced o no,
  // no afecta el código dentro del módulo. Esto también
  // significa que en los getters de los módulos, el
  // argumento contendrá solo los getters locales. Por esto
  // añadiremos un cuarto argumento puede ser pasado; este
  // contendrá los rootGetters.
  getters: {
    // cartProducts(state, getters, rootState) {
    cartProducts(state, getters, rootState, rootGetters) { // Namespaced Vuex Modules 2:18 añadimos rootGetters
                                                           // con los rootGetters podemos acceder a los getters
                                                           // fuera de este módulo. Ahora ve a actions
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
    // addProductToCart({ state, getters, commit, rootState }, product) {
    addProductToCart({ state, getters, commit, rootState, rootGetters }, product) {
      // Namespaced Vuex Modules 2:33
      // Para las acciones, el objeto context contendrá todos
      // los gettes bajo la propiedad rootGetters. La acción
      // addProductToCart, podemos acceder a productIsInStock
      // bajo rootGetters
      // if (getters.productsInStock(product)) {
      // Recordemos que el getter productIsInStock es products/productIsInStock.
      // Entonces aquí usaremos corchetes para especificar el namespaced,
      // este lo usaremos en el componente ShoppingCart.
      if (rootGetters['products/productIsInStock'](product)) {
        const cartItem = state.items.find(item => item.id === product.id);
        if(!cartItem) {
          // si el item no existe lo añadiremos al carrito
          commit('pushProductToCart', product.id);
        } else {
          // Si el cartItem existe, haremos commit de otra mutación
          commit('incrementItemQuantity', cartItem);
        }
        // commit('decrementProductInventory', product);
        // Namespaced Vuex Modules 5:20 comentamos lo de arriba
        // unknown local mutation type: decrementProductInventory, global type: cart/decrementProductInventory
        // Como no le hemos pasado el namespace, Vuex piensa que esta mutación está bajo el módulo cart.
        // El único lugar en el que usamos decrementProductInventory, es dentro de addProductToCart,
        // pasamoe el namespaced products pero no funcionará, aparece en consola.
        // unknown local mutation type: products/decrementProductInventory,
        // global type: cart/products/decrementProductInventory
        // Esto es útil cuando se tiene módulos con namespaced anidado, pero para despachar acciones
        // o hacer commit a mutaciones empezando desde el namespaced global tenemos que pasar root: true
        // como tercer argumento a dispatch y commit
        commit('products/decrementProductInventory', product, { root: true });
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
    // Las acciones, mutaciones y getters dentro de módulos están registrados
    // en el nombre de espacio global. Esto significa que, por ejemplo cuando
    // más de un módulo tiene una acción con el mismo nombre todas estas acciones
    // ejecutadas lo despacharán. Ponemos como ejemplo agregar fetchProducts()
    // que es una acción de products y la copiaremos en cart action. La acción fetch
    // es despachada una vez que el componente ProductList es creado.
    // Aparecerá primero 'hi from cart' porque en el index.js en modules el primero
    // que aparece es cart y luego products. Si cambiar el orden aparecerá primero
    // 'Hi from products'.
    fetchProducts() {
      console.log('hi from cart');
    },
  },
}
