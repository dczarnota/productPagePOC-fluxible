/** @jsx React.DOM */
var React = require('react');
var FramingOptions= require('./framingOptions.react');
var PriceComnponent = require('./priceComponent.react');
var StaticTextComponent = require('./staticTextComponent.react');
var AddTocart_SaveToGal_Component = require('./addTocart_SaveToGal_Component.react');
var Helpline_Chat_Component = require('./helpline_Chat_Component.react');
var rightComponent = React.createClass({

	render: function() {
		var priceData = this.props.priceData;
		return (
			<div className="rightComponent pure-u-1 pure-u-md-2-5 pure-u-sm-2-5">
				<div className="rightComponentContainer pure-g">
					<FramingOptions></FramingOptions>
					<PriceComnponent priceData={priceData}></PriceComnponent>
					<StaticTextComponent></StaticTextComponent>
					<AddTocart_SaveToGal_Component></AddTocart_SaveToGal_Component>
					<Helpline_Chat_Component></Helpline_Chat_Component>
				</div>
			</div>
		);
	}

});

module.exports = rightComponent;
