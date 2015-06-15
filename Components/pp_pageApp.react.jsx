/** @jsx React.DOM */
var React = require('react');
var Title = require('./pp_TitleComponent.react');
var Hero = require('./pp_heroComponent.react');
var RightComponent = require('./rightComponent.react');
// var skinnyBannerComponent= require('./skinnyBannerComponent.react');
var FluxibleMixin = require('fluxible').Mixin;
var ProductStore = require('../stores/productStore');

var pp_pageApp = React.createClass({

	mixins: [ FluxibleMixin ],

	/*
	 * Whenever this component hears a change emitted from a store it is
	 * listening to, it will execute the onChange handler function.
	 */
	// statics: {
	//     storeListeners: [ ProductStore ]
	// },

	/*
	 * Flux magic!
	 *
	 * A store emitted a change! Update the component's state with current
	 * store data, which will trigger a re-render.
	 */
	// onChange: function() {
	//     this.setState(this.getStore(ProductStore).getProducts());
	// },

	getInitialState:  function() {
    var data = this.getStore(ProductStore).getProducts()
		// console.log('data: ',data);
    return {
    	data: data
    };
	},

	addToCart: function(e) {
		e.preventDefault();
		console.log('click');
		return false;
	},

	render: function() {
		// console.log('pp_pageApp context: ',this.context);

		return (
			<div id="pageApp">
				<div id="skinnyBanner"></div>
				<Title titleData={this.state.data.title}></Title>
				<Hero heroData={this.state.data.hero}></Hero>
				<RightComponent priceData={this.state.data.price} addToCart={this.addToCart}></RightComponent>
			</div>
		);
	}

});

module.exports = pp_pageApp;
