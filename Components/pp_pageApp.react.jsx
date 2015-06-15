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

	getInitialState:  function() {
    var data = this.getStore(ProductStore).getProducts()
    return {
    	data: data
    };
	},

	render: function() {
		// console.log('this.state.data: ',this.state.data)
		return (
			<div id="pageApp">
				<div id="skinnyBanner"></div>
				<Title titleData={this.state.data.title}></Title>
				<Hero heroData={this.state.data.hero}></Hero>
				<RightComponent priceData={this.state.data.price}></RightComponent>
			</div>
		);
	}

});

module.exports = pp_pageApp;
