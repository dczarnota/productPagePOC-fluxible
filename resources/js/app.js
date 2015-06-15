/** @jsx React.DOM */
// require('node-jsx').install({extension: '.jsx'});
var React = require('react');

var SkinnyBannerComponent = require('../../Components/skinnyBannerComponent.react.jsx');
  
React.renderComponent(
	<SkinnyBannerComponent/>,
	document.getElementById('skinnyBanner')
);
