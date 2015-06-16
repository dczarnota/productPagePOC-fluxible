'use strict';

var createStore = require('fluxible/utils/createStore');

var ProductStore = createStore({
  storeName: "ProductStore",

  /*
   * Whenever one of these events is dispatched from an action, handle it with
   * the corresponding function. Note: multiple stores can listen to the same
   * event, and Fluxible provides a waitFor function to handle inter-store
   * dependencies.
   */
  handlers: {
    'RECEIVE_PRODUCT_SUCCESS': 'updateProduct',
    'ADD_TO_CART': 'addToCart'
  },

  initialize: function () {
    this.products = [];
    this.cart = [];
  },

  getProducts: function () {
    return this.products;
  },

  addToCart: function(){
    console.log('ProductStore addToCart');
  },

  /*
   * Update the store's internal state with the payload from an action.
   *
   * Flux magic!
   * this.emitChange() will send a change event to all components who are
   * listening for updates from this particular store. When a subscribed
   * component hears this emitted change, it will trigger a re-render and
   * React happiness follows.
   */

  updateProduct: function(payload) {
    this.products = payload;
    this.emitChange();
   },

  updateCart: function (payload) {
    this.cart = payload;
    this.emitChange();
  },

  /*
   * Dehydrate/rehydrate used to share store's state from server to client.
   * More explanation in server/index
   */
  dehydrate: function () {
    console.log('dehydrate');
    return {
      products: this.products,
      cart: this.cart
    };
  },
  rehydrate: function (state) {
    console.log('rehydrate');
    this.products = state.products;
    this.cart = state.cart;
  }
});

module.exports = ProductStore;
