/** @jsx React.DOM */
var React = require('react');
var Title = require('./pp_TitleComponent.react.jsx');
var Hero = require('./pp_heroComponent.react.jsx');
var RightComponent = require('./rightComponent.react.jsx');
var skinnyBannerComponent= require('./skinnyBannerComponent.react.jsx');
var FluxibleMixin = require('fluxible').Mixin;
var ProductStore = require('../stores/productStore');

var pp_pageApp = React.createClass({

	mixins: [ FluxibleMixin ],

	/*
	 * Whenever this component hears a change emitted from a store it is
	 * listening to, it will execute the onChange handler function.
	 */
	// statics: {
 //    storeListeners: [ ProductStore ]
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

	render: function() {
		return (
			<div id="pageApp">
				<skinnyBannerComponent promoData={this.state.data.promoData}></skinnyBannerComponent>
				<Title titleData={this.state.data.title}></Title>
				<Hero heroData={this.state.data.hero}></Hero>
				<RightComponent priceData={this.state.data.price}></RightComponent>
			</div>
		);
	}

});

module.exports = pp_pageApp;
