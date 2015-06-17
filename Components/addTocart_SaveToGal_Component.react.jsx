/** @jsx React.DOM */
var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var AddToCartAction = require('../actions/AddToCartAction');
var ProductStore = require('../stores/ProductStore');

var addTocart_SaveToGal_Component = React.createClass({

	mixins: [ FluxibleMixin ],

	// statics: {
 //    storeListeners: [ ProductStore ]
	// },

	addToCart: function(){
		console.log('addTocart_SaveToGal_Component click');
		this.context.executeAction(AddToCartAction, {});
	},

	render: function() {
		return (
			<div className="addTocart_SaveToGal_Component pure-u-1 pure-u-md-23-24">
				<button type="button" className="addToCart btn pure-u-sm-3-5" onClick={this.addToCart}>ADD TO CART</button>
				<div className="addToGal">
					<i className="fa fa-heart-o fa-2x"></i>
				</div>
			</div>
		);
	}

});

module.exports = addTocart_SaveToGal_Component;