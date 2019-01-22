import shop from '@/api/shop';

export default {
  state: {
    // products: [],// Vue modules 5:27 cambiamos el nombre para hacerlo más acorde
    items: []       // y tenemos que modificar los state.products por state.items
  },
  getters: {
    availableProducts(state, getters) {
      // return state.products.filter(product => product.inventory > 0);
      return state.items.filter(product => product.inventory > 0);
    },
    productsInStock(state) {
      // Nos devolverá una función que aceptará un producto como un argumento
      // En lugar de pasar un producto, podemos pasar su código com argumento
      // y tomar el producto del estado, aunque basta con pasar el objeto product
      // usaremos este getter en ProductList
      return (product) => {
        return product.inventory > 0;
      }
    },
  },
  mutations: {
    setProducts(state, products) {// Vuex Modules 2:37 mover a products.js
      // update products
      // state.products = products; // actualizamos el estado de products en la carga
                                 // Vue Modules 5:29 le cambiamos el nombre state.products
      state.items = products; // a state.items
    },
    decrementProductInventory(state, product){// Vuex Modules 2:37 mover a products.js
      product.inventory--;
    },
  },
  actions: {
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
  }
}
