/** @jsx React.DOM */
// require('node-jsx').install({extension: '.jsx'});
var React = require('react');
var app = require('./app.js');
// window.React = React;

// var SkinnyBannerComponent = require('../../Components/skinnyBannerComponent.react.jsx');
// var pp_pageApp = require('../../Components/pp_pageApp.react.jsx');

var dehydratedState = JSON.parse(document.getElementById('initial-state').innerHTML);

// console.log('dehydratedState: ',dehydratedState);

app.rehydrate(dehydratedState, function(err, context){
  if(err){
    console.log('app.rehydrate err: ',err)
    throw err;
  }

  // window.context = context;
  var mountNode = document.getElementById('main-body');
  var Component = app.getComponent();

  React.render(
    Component({ context: context.getComponentContext() }),
    mountNode,
    function(){
      console.log('React client-side rendered');
    }
  );
});


// console.log('state: ',state);

// React.renderComponent(
// 	<SkinnyBannerComponent/>,
// 	document.getElementById('skinnyBanner')
// );
