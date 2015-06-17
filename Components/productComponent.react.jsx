/** @jsx React.DOM */
var React = require('react');
var Title = require('./pp_TitleComponent.react.jsx');
var Hero = require('./pp_heroComponent.react.jsx');
var RightComponent = require('./rightComponent.react.jsx');

var productComponent = React.createClass({

  render: function(){
    return (
      <div>
        <Title titleData={this.props.title}></Title>
        <Hero heroData={this.props.hero}></Hero>
        <RightComponent priceData={this.props.price}></RightComponent>
      </div>
    )
  }

});

module.exports = productComponent;