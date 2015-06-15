"use strict";

/*
 * Route's action will be executed by navigateAction in server/index
 */
module.exports = {

  ProductPage: {
    path: '/',
    method: 'get',
    action: require('../actions/loadProductAction')
  }

};
