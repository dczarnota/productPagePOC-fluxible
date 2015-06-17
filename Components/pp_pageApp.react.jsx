/** @jsx React.DOM */
var React = require('react');
var Title = require('./pp_TitleComponent.react.jsx');
var Hero = require('./pp_heroComponent.react.jsx');
var RightComponent = require('./rightComponent.react.jsx');
var SkinnyBannerComponent= require('./skinnyBannerComponent.react.jsx');
var FluxibleMixin = require('fluxible').Mixin;
var ProductStore = require('../stores/productStore');
var PromoStore = require('../stores/promoStore');
var ProductComponent = require('./ProductComponent.react.jsx');

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
    var data = this.getStore(ProductStore).getProducts();
    var promoData = this.getStore(PromoStore).getPromo();
		// console.log('data: ',data);
    return {
    	data: data,
    	promoData: promoData
    };
	},

	render: function() {
		// console.log('pp_pageApp data: ', this.state.data);
		return (
			<div id="pageApp">
				<SkinnyBannerComponent promoData={this.state.promoData}></SkinnyBannerComponent>
				<ProductComponent title={this.state.data.title} hero={this.state.data.hero} price={this.state.data.price}></ProductComponent>
			</div>
		);
	}

});

module.exports = pp_pageApp;

				// <Title titleData={this.state.data.title}></Title>
				// <Hero heroData={this.state.data.hero}></Hero>
				// <RightComponent priceData={this.state.data.price}></RightComponent>