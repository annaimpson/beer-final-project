var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Header = require('./header.jsx');
var Parse = require('parse');
var Mixin = require('backbone-react-component');

var SearchBrewsListing = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getNewBreweryPage: function(breweryPage){
    var searchBreweries = this.props.collection;
    searchBreweries.getNewBreweryPage(breweryPage);
  },
  render: function(){
    var BrewList = this.props.collection.map(function(model){
      return (
        <SearchBrews
          established={model.established}
          name={model.name}
          key={model.id}
          image={image}
        />
      )
    });
    return (
      <div className="row">
        {BrewList}
      </div>
    );
  }
});

var SearchBrews = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    console.log(this.props.model);
    return(
      <div>
        <div className = "col-md-4">
          <p>{this.props.established} alt="beer is good!!"</p>
          <p>{this.props.model.name}</p>
        </div>
      </div>
    );
  }
});



module.exports = SearchBrewsListing;
