'use strict';

module.exports = function(context, payload, done){
  console.log('AddToCartAction payload: ',payload);

  context.dispatch('ADD_TO_CART', payload);
};
