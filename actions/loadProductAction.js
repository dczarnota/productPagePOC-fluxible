'use strict';

// var RSVP = require('rsvp');
var async = require('async');

/*
 * Action executed on the server before route loads. All server functionality,
 * data fetching, etc. needed for initial page load happens here.
 */
 module.exports = function (context, payload, done) {

  async.parallel({
    getPromo: function(callback){
      console.log('getPromo')
      context.service.read('getPromoService', {}, {}, function(err, results){
        if(err){
          throw(err);
        }
        callback(null, results);
      });
      // callback(null, results);
    },
    getProduct: function(callback){
      context.service.read('productService', {}, {}, function(err, results) {
        if (err) { 
          throw(err);
        }
        console.log('loadProductAction fired.');
        callback(null, results);
      });
    }

  }, function(error, results){
    // console.log('results: ',results);
    var product = results.getProduct;
    var getPromoData = results.getPromo;

    console.log('product: ');
    console.log('getPromoData: ');


    context.dispatch('RECEIVE_PRODUCT_SUCCESS', product);
    context.dispatch('RECEIVE_PROMO_SUCCESS', getPromoData);
    done();
  });

};
