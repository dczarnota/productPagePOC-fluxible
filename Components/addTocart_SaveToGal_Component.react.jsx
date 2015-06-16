/** @jsx React.DOM */
var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var AddToCartAction = require('../actions/AddToCartAction');
var ProductStore = require('../stores/ProductStore');

var addTocart_SaveToGal_Component = React.createClass({

	propTypes: {
		addToCart: React.PropTypes.func.isRequired
	},

	mixins: [FluxibleMixin],

	statics: {
	    storeListeners: [ ProductStore ]
	},

	add: function(){
		console.log('addTocart_SaveToGal_Component click');
		this.context.executeAction(AddToCartAction, {});
	},

	render: function() {
		console.log('this.props.addToCart: ',this.props.addToCart)
		return (
			<div className="addTocart_SaveToGal_Component pure-u-1 pure-u-md-23-24">
				<button type="button" className="addToCart btn pure-u-sm-3-5" onClick={this.add}>ADD TO CART</button>
				<div className="addToGal">
					<i className="fa fa-heart-o fa-2x"></i>
				</div>
			</div>
		);
	}

});

module.exports = addTocart_SaveToGal_Component;