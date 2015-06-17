/** @jsx React.DOM */
var React = require('react');
var request = require('superagent');

var SkinnyBannerComponent = React.createClass({
	getInitialState: function() {

		return {
			promoData: this.props.promoData
		};
	},

	render: function() {
		var data = this.state.promoData;
		console.log('SkinnyBannerComponent data: ',data)
		// if (this.state.promoData) {
	     return (<div className = "skinny-banner-container">
			<div className = "promo-container" >
			<div className = "banner-text" > {data.DiscountOffer} </div> 
			<div className = "banner-details" >
			<div className = "promo-code" > Use code: <br></br> 
			<span>lalalal== {data.DiscountCode} </span></div> 
			</div> <div className = "banner-exp-date banner-exp-date1">
			 Ends: {data.DiscountExpirationDt} 
			 </div>
			 <div className = "banner-terms-link" > details </div> 
			 <div className = "clear">
			 </div></div></div>
		);
	    // } else {
	      // return (<div className="divLoading">Loading...</div>);
	    // }
		
	}

});

module.exports = SkinnyBannerComponent;