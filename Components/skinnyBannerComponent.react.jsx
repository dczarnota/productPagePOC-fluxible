/** @jsx React.DOM */
var React = require('react');
var request = require('superagent');

var SkinnyBannerComponent = React.createClass({
	getInitialState: function() {

		return {
			promoData: null
		};
	},
	componentDidMount: function() {
		console.log("========> FIring");
		$.get("http://api.art.com/EcommerceAPI.svc/jsonp/PromosGetActive?apiKey=328CE70CEB414F77972BB1FA4449E915&sessionId=D6B5E1FC7661477CAFDB5F8D67D4E7BB", function(response) {
			console.log(response);
			var promoData = response.d.Discount[0];
			promoData.DiscountExpirationDt = new Date(parseInt(promoData.DiscountExpirationDt.split("/Date(").pop().split(")/")[0]));
			promoData.DiscountExpirationDt = (promoData.DiscountExpirationDt.getMonth() + 1) + "/" + promoData.DiscountExpirationDt.getDate() + "/" + promoData.DiscountExpirationDt.getFullYear().toString().substr(2, 2);
			
			if (this.isMounted()) {
				this.setState({
				promoData: promoData
			});
			}
		}.bind(this));
		
	},
	render: function() {
		var data = this.state.promoData;
		if (this.state.promoData) {
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
	    } else {
	      return (<div className="divLoading">Loading...</div>);
	    }
		
	}

});

module.exports = SkinnyBannerComponent;