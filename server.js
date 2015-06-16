"use strict"

require('node-jsx').install({extension: '.jsx'});


var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var log = require('./Utils/logger');
var reqLogger = require('morgan');

var serialize = require('serialize-javascript');
var favicon = require('serve-favicon');
var React = require('react');
var navigateAction = require('flux-router-component').navigateAction;
var app = require('./app');
var HtmlComponent  = React.createFactory(require('./Components/htmlComponent.react'));
var pp_pageApp = require('./Components/pp_pageApp.react');

// Create an express instance and set a port variable
var server = express();
var port = process.env.PORT || 8000;

server.use(reqLogger('dev'));
server.use(favicon(__dirname + '/favicon.ico'));
server.set('views', path.join(__dirname,'./views'));
server.engine('handlebars', exphbs({ defaultLayout: 'main'}));

server.set('view engine', 'handlebars');

// Disable etag headers on responses
server.disable('etag');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, '/public/')));

// Get access to the app's fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');

// Register our REST services with fetchr
fetchrPlugin.registerService(require('./services/productService'));

// Set up the fetchr server middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// This is the entry point into the Flux flow
server.use(function(req, res){

  // Create a request-scoped context to isolate data per request
  var context = app.createContext({
    req: req
  });

  // Fluxible has context interfaces for Action Creators, Components, and Stores which provide access to Flux methods needed by each.
  // Action Context provides dispatch, executeAction, and getStore

  var actionContext = context.getActionContext();

  actionContext.executeAction(navigateAction, {
    url: req.url
  }, function(err){
    if(err){
      res.status(500);
      console.log('navigateAction err: ', err);
      return;
    }

    /*
     * Exposing your app's server-rendered state so React can re-initialize
     * client-side on top of the existing DOM.
     *
     * Dispatchr provides dehydrate/rehydrayte functions that will serialize
     * data from all registered stores.
     *
     * We create a string variable to pass into the pp_pageApp below,
     * which will be rendered as JavaScript to create an App variable on
     * the global window object.
     */
     var exposed = serialize(app.dehydrate(context));

     // Application's root component defined in app.js
     var Component = app.getComponent();


     /*
     * Render our React application to basic HTML. This function adds
     * data-reactid attributes to each DOM node for the client to reconcile.
     *
     * Component Context provides access to getStore and executeAction and
     * is shared with all child components using React's built-in context
     * thanks to FluxibleMixin.
     *
     * The markup prop will contain the output from React rendering our
     * root app component.
     * 
     */

     console.log('navigateAction no error')

     // console.log('metaTags: ', app.dehydrate(context).context.dispatcher.stores.ProductStore.products.metaTags);

     var productData = app.dehydrate(context).context.dispatcher.stores.ProductStore.products;
     // console.log('productData: ', productData);

     var markup = React.renderToString(
        Component({
          context: context.getComponentContext()
      })
     );

     // console.log('html: ',html)
     // Render
     // res.send(html);

     res.render('product', {
       htmlTag: productData.htmlTag,
       title: productData.htmlTitle,
       metaTags: productData.metaTags,
       markup: markup,
       state: exposed
     });

  });
});

var nodeServer = http.createServer(server).listen(port, function() {
  var addr = nodeServer.address();
  log.info('App starting on : '+addr.address + ' Listening on port :' + addr.port);
});