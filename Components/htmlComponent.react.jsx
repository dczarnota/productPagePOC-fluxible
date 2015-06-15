/** @jsx React.DOM */
'use strict';

var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;

var Html = React.createClass({

  Mixins: [ FluxibleMixin ],

  render: function(){
    return (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <meta name="viewport" contetn="width=device-width, initial-scale=1"/>
          <title></title>
          <link rel="stylesheet" type="text/css" href="css/style.css"/>
          <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css"/>
          <link rel="stylesheet" type="text/css" href="css/base-min.css"/>
          <link rel="stylesheet" type="text/css" href="css/grids-min.css"/>
          <link rel="stylesheet" type="text/css" href="css/grids-responsive-min.css"/>
          <link rel="stylesheet" type="text/css" href="css/browseMenu.css"/>
        </head>

        <body>
            {/* Inject root application component */}
            <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
        </body>

        {/* Exposes dehydrated json state of all the stores as window.App */}
        <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        <script src="js/bundle.js" type="text/javascript" charSet="utf-8"></script>
      </html>
    )
  }

});

module.exports = Html;