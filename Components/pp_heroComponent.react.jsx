/** @jsx React.DOM */
var React = require('react');

var pp_heroComponent = React.createClass({

	render: function() {
		var data = this.props.heroData;	
		return (
			<div className="heroModule pure-u-1 pure-u-md-3-5 pure-u-sm-3-5">
				<div className="visualizer heroImage pure-u-4-5">
					<img className="pure-img" src={data.genericImageUrl}/>
				</div>
			</div>
		);
	}

});


module.exports = pp_heroComponent;