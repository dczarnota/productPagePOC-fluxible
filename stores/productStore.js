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
    'ADD_TO_CART': 'addItemToCart'
  },

  initialize: function () {
    this.products = [];
    this.cart = [];
  },

  getProducts: function () {
    return this.products;
  },

  addItemToCart: function(){
    console.log('ProductStore addItemToCart()');

    // Add current product data to cart
    this.cart = this.products;

    // Get current item count from cart header (string format)
    var currentCartCount = document.getElementById('HeaderCartCount').innerHTML;

    // Convert string to array and split the array
    var countArray = currentCartCount.split(' ');

    // This is the number of items in the cart
    var itemCount = parseInt(countArray[2]);

    // Increment to reflect user action
    itemCount++;

    // Prepare HTML string with updated cart count
    var updatedHTML = ' ( ' + itemCount.toString() + ' ) ';

    // Reset the innerHTML to the updatedHTML
    document.getElementById('HeaderCartCount').innerHTML = updatedHTML;
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
    console.log('updateProduct()');
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
