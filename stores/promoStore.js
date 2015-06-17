'use strict';

var createStore = require('fluxible/utils/createStore');

var PromoStore = createStore({
  storeName: "PromoStore",

  /*
   * Whenever one of these events is dispatched from an action, handle it with
   * the corresponding function. Note: multiple stores can listen to the same
   * event, and Fluxible provides a waitFor function to handle inter-store
   * dependencies.
   */
  handlers: {
    'RECEIVE_PROMO_SUCCESS': 'updatePromo'
  },

  initialize: function(){
    this.promoData = {};
  },

  updatePromo: function(payload){
    console.log('updatePromo()');
    this.promoData = payload;
    this.emitChange();
  },

  getPromo: function(){
    return this.promoData;
  },

  dehydrate: function () {
    console.log('dehydrate');
    return {
      promoData: this.promoData
    };
  },
  rehydrate: function (state) {
    console.log('rehydrate');
    this.promoData = state.promoData;
  }

});

module.exports = PromoStore;
