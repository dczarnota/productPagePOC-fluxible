/** @jsx React.DOM */
var React = require('react');

var framingOptions = React.createClass({

	render: function() {
		return (
			<div className="framingOptionsComponent pure-u-1 pure-u-md-23-24">
				<div className="framingOptionsTitle">Choose a Framing Option</div>
				<div className="framingOptionsHelpText orangeText">Learn more about framing 
					<span className="fa-stack">
					  <i className="fa fa-circle-thin fa-stack-1x"></i>
					  <i className="fa fa-info fa-stack-1x"></i>
					</span>
				</div>
				<div className="framingOptions">
					<div className="unframed">
					<img src="http://cache1.allpostersimages.com/images/photostoart/print_only_icon.png"/>
						<span>Unframed Print</span>
					</div>
					<div className="recomended">
						<img src="http://cache1.allpostersimages.com/images/photostoart/switch_art_icon.png"/>
						<span>Recomended Frame</span>
					</div>
					<div className="customFrame">
					<img src="http://cache1.allpostersimages.com/images/photostoart/services_icons_framing.png"/>
						<span>Design a Custom Frame</span>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = framingOptions;