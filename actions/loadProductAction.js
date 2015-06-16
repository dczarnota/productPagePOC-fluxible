'use strict';

var RSVP = require('rsvp');

/*
 * Action executed on the server before route loads. All server functionality,
 * data fetching, etc. needed for initial page load happens here.
 */
module.exports = function (context, payload, done) {

  // Create RSVP promise to fetch asynchronous data from the server
  var getProduct = new RSVP.Promise(function (resolve, reject) {
    // var res = payload.navigate.res;
    /*
     * Call productService's read() with fetchr and handle the response
     * in callback. If the call succeeded, resolve the promise passing in
     * the server payload. Otherwise, reject the promise with the error.
     */
    context.service.read('productService', {}, {}, function(err, results) {
      if (err) { 
        reject(err);
      }
      // console.log('action: ',results);
      // console.log('')
      resolve(results);
    });

  });

  getProduct.then(function(product) {
    /*
     * Flux magic!
     *
     * Dispatch a named event to all stores registered to handle this
     * specific event, passing along the action's payload.
     */
     // console.log('loadProductAction: ',product)
    context.dispatch('RECEIVE_PRODUCT_SUCCESS', product);
    done();
  }).catch(function (err) {
    console.error(err);
    done(err);
  });
};
