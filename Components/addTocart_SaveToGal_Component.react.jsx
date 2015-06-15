/** @jsx React.DOM */
var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var AddToCartAction = require('../actions/AddToCartAction');
var ProductStore = require('../stores/ProductStore');

var addTocart_SaveToGal_Component = React.createClass({

	mixins: [FluxibleMixin],

	statics: {
	    storeListeners: [ ProductStore ]
	},

	render: function() {
		console.log('addToCart: ',this.props.addToCart);

		return (
			<div className="addTocart_SaveToGal_Component pure-u-1 pure-u-md-23-24">
				<div className="addToCart btn pure-u-sm-3-5">
					<a className="" href="#" onClick={this.props.addToCart}>ADD TO CART</a>
				</div>
				<div className="addToGal">
					<i className="fa fa-heart-o fa-2x"></i>
				</div>
			</div>
		);
	}

});

module.exports = addTocart_SaveToGal_Component;