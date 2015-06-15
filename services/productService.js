'use strict';

var JSX = require('node-jsx').install();
var React = require('react');
var express = require('express');
var router = express.Router();
var httpRequest = require('../Utils/HttpRequestModule');
var metaTagBuilder = require('../Utils/metaTagBuilder');
var log = require('../Utils/logger');
var productModel = require('../Models/productModel');
var productPageComponent = require('../Components/pp_pageApp.react');
var async = require('async');

var seoUrl = "http://api.art.com/ECommerceAPI.svc/jsonp/SEOMetaInfoGet?apiKey=519BAAC8E607413CA1FC043C92D08AAD&sessionId=A0F866D6907D411395E5CEDB6C359357&pageSourceType=ProductPage&itemId=8936349&categoryID=6126&pageNumber=1";
 //var catelogITemUrl = "http://api.art.com/EcommerceAPI.svc/jsonp/CatalogItemGet?apiKey=519BAAC8E607413CA1FC043C92D08AAD&sessionId=130740845CEE4EF48D1CCCBA792C7365&itemId=8936349&lookupType=ItemNumber";
 var catelogItemVariations = "http://api.art.com/EcommerceAPI.svc/jsonp/CatalogItemGetVariations?apiKey=519BAAC8E607413CA1FC043C92D08AAD&sessionId=130740845CEE4EF48D1CCCBA792C7365&itemId=8936349&lookupType=ItemNumber";

/*
 * Fetchr provides an abstraction which allows you to fetch data using the same
 * syntax on both server and client. For example, you can make a request using
 * node's request module on the server and use the same service service on the
 * client without having to write a separate AJAX request to the same endpoint.
 */
module.exports = {

  // Actions use this name to call fetchr services
  name: 'productService',

  /*
   * Fetchr requires CRUD interface names
   */
  read: function(req, resource, params, config, callback) {
    /*
    * START API CALL
    */
    var Stopwatch = require('timer-stopwatch');
    var stopwatch = new Stopwatch();
    stopwatch.start();
    var apiData;

    /*
    parallel implementation
     */
    async.parallel({
      /*
      catalog item call
      */
      productData:function(callback) {

        log.info('Initiating product Catalog item get call-->' + stopwatch.ms);
        httpRequest.makeGetRequest(catelogItemVariations, null, function(err, data) {
          if (!err) {
            log.info('Catalog item get call successful-->' + stopwatch.ms);
            //get only the First Item of the aarray
            data = data.d.Items[1];
            log.info('Passing the raw data through filter to flatten the response-->' + stopwatch.ms);

            callback(null, data);
          } else {
            log.error('Catelog call failed => error -->' + stopwatch.ms + err)
          }
        });
      },
      /*
       SEO meta tag's call
       */
      seoData:function(callback) {
        var seoTags = metaTagBuilder.getMetaTags(seoUrl, function(error, data) {
          if (!error) {
            log.info('meta tag call successful-->' + stopwatch.ms);
            callback(null, data);
          } else {
            log.error('Meta tag call failed, error -->' + stopwatch.ms + error);
          }
        });
      },
      /*
       Get promoi\skinny banner call
      */
      // promoData:function(callback) {
      //   var api = "http://api.art.com/EcommerceAPI.svc/jsonp/PromosGetActive?apiKey=328CE70CEB414F77972BB1FA4449E915&sessionId=D6B5E1FC7661477CAFDB5F8D67D4E7BB";
      //   log.info('Initiating skinny banner get call -->' + stopwatch.ms);
      //   httpRequest.makeGetRequest(api, null, function(err, promoData) {
      //     if (!err) {
      //       log.info('skinny banner get call successful-->' + stopwatch.ms);
      //       callback(null, promoData.d.Discount[0]);
      //     } else {
      //       log.error('skinny banner get call failed => error -->' + stopwatch.ms + err)
      //     }
      //   });
      // }
      },
      /*
       Done function
       Product data is flattened
       Component gets renderd
       meta tags are popupated
       skinny banner is rendered
       Page is rendered
      */
      function(error,results) {
        log.info('Passing the raw data through filter to flatten the response-->' + stopwatch.ms);
        //pass the raw data througn a filter to flatten the data
        var product  = productModel.getFlatResponse(results.productData);
        var titleData = {
          title: product.title,
          artist: product.artist,
          productType: product.productType,
          ProductPageUrl: product.ProductPageUrl,
          sku: product.sku
        }

        product.images.genericImageUrl = "http://imgc.artprintimages.com/img/metal/art-print/robbie-george-the-maroon-bells-in-autumn_i-G-64-6410-72I9100Z.jpg";
        var herodata = product.images;

        var today = new Date();
        var tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];

        var rightComponentData = {
          displayPrice: product.prices.displayPrice,
          price: "$" + product.prices.price,
          arrivesBy: monthNames[tomorrow.getMonth()] + " " + tomorrow.getDate()
        };

        log.info('rendering component-->' + stopwatch.ms)
          /*
          renderthe react components
           */
        
        // results.promoData.DiscountExpirationDt = new Date(parseInt(results.promoData.DiscountExpirationDt.split("/Date(").pop().split(")/")[0]));
        // results.promoData.DiscountExpirationDt = (results.promoData.DiscountExpirationDt.getMonth() + 1) + "/" + results.promoData.DiscountExpirationDt.getDate() + "/" + results.promoData.DiscountExpirationDt.getFullYear().toString().substr(2, 2);

        // var markup = React.renderComponentToString(
        //   productPageComponent({
        //     Title: titleData,
        //     Hero: herodata,
        //     Price: rightComponentData
        //   })
        // );

        log.info('rendering page-->' + stopwatch.ms);
        var metaTags = [];
        for (var i = 2; i < results.seoData.length; i++) {
          metaTags.push(results.seoData[i].Value);
        }

        // res.render('product', {
        //   htmlTag: results.seoData[0].Value,
        //   title: results.seoData[1].Value,
        //   metaTags: metaTags,
        //   markup: markup
        // });

        var apiData = {
          title: titleData,
          hero: herodata,
          price: rightComponentData,
          htmlTag: results.seoData[0].Value,
          htmlTitle: results.seoData[1].Value,
          metaTags: metaTags
        };
        // console.log('apiData: ', apiData);
        // res.render()
        // console.log('callback: ',callback)

        callback(null, apiData, metaTags);
      });
  }
};
