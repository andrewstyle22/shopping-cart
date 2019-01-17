import Vuex from 'vuex';
import Vue from 'vue';
import shop from '@/api/shop';

Vue.use(Vuex);

// Los stores de Vuex tienen cinco opciones
// State, mutations, getters, actions y modules
export default new Vuex.Store({
  state: { // = data
    products: [],
    // {id, quantity } Solo almacenaremos objetos que contengan el
    // código y el número de items que el usuario desee comprar
    // necesitaremos una acción y una mutación para añadir el producto al carrito
    cart: [],
  },
  getters: { // = computed properties global
    // por ejemplo queremos mostrar los productos que no están agotados
    // o calcular el total del carrito
    // al igual que las mutaciones, el primer parámetro es el estado,
    // además, Vuez pasa todos los getters existentes como el segundo parámetro.
    // Los getters rastrean sus propias dependencias y se actualizan automáticamente
    // cuando una dependencia cambia.
    availableProducts(state, getters) {
      return state.products.filter(product => product.inventory > 0);
    },
    // Obtener los productos del carrito
    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id);
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    }
  },
  actions: { // = métodos, aquí realizamos la llamada al api
             // Las acciones son métodos del store
             // caundo necesitamos ubicar los productos desde una API
             // creamos una acción para ello
             // Las acciones son usualmente asíncronas
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
    fetchProducts({commit}) {
      // make the call
      // then run setProducts mutations
      // Las acciones son usualmente asíncronas necesitamos saber cuando
      // se realiza una acción,para ello, podemos devolver una promesa de nuestra
      // acción y manejarla luego con store.dispatch
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          // store.commit('setProducts', products);
          //context.commit('setProducts', products);
          commit('setProducts', products)
          resolve()
        });
      })
    },
    // las acciones es responsables por la lógica implicada en la activación
    // de una mutación
    addProductToCart(context, product) {
      if(product.inventory > 0) {
        const cartItem = context.state.cart.find(item => item.id === product.id);
        if(!cartItem) {
          // si el item no existe lo añadiremos al carrito
          context.commit('pushProductToCart', product.id);
        } else {
          // Si el cartItem existe, haremos commit de otra mutación
          context.commit('incrementItemQuantity', cartItem);
        }
        context.commit('decrementProductInventory', product);
      }
    }
  },
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
    setProducts(state, products) {
      // update products
      state.products = products; // actualizamos el estado de products en la carga
    },
    // No necesitamos conocer realmente el código de cada mutación, porque cada
    // mutación posee una única responsabilidad de cambiar el estado
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity:1
      })
    },
    incrementItemQuantity(state, cartItem){
      cartItem.quantity++;
    },
    decrementProductInventory(state, product){
      product.inventory--;
    }
  }
});

