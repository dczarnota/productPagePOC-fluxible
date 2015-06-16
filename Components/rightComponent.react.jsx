/** @jsx React.DOM */
var React = require('react');
var FramingOptions= require('./framingOptions.react.jsx');
var PriceComnponent = require('./priceComponent.react.jsx');
var StaticTextComponent = require('./staticTextComponent.react.jsx');
var AddTocart_SaveToGal_Component = require('./addTocart_SaveToGal_Component.react.jsx');
var Helpline_Chat_Component = require('./helpline_Chat_Component.react.jsx');
var rightComponent = React.createClass({

	render: function() {
		var priceData = this.props.priceData;
		return (
			<div className="rightComponent pure-u-1 pure-u-md-2-5 pure-u-sm-2-5">
				<div className="rightComponentContainer pure-g">
					<FramingOptions></FramingOptions>
					<PriceComnponent priceData={priceData}></PriceComnponent>
					<StaticTextComponent></StaticTextComponent>
					<AddTocart_SaveToGal_Component addToCart={this.props.addToCart}></AddTocart_SaveToGal_Component>
					<Helpline_Chat_Component></Helpline_Chat_Component>
				</div>
			</div>
		);
	}

});

module.exports = rightComponent;
