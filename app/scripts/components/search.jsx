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
    searchedBeer.set('breweryPage', breweryPage);
    Backbone.history.navigate('searchResults', {trigger: true})
  },
  render: function(){
    console.log(this);
    var BrewList = this.props.BrewList.collection.map(function(model){
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
          <p>{this.props.model.get("established")} alt="beer is good!!"</p>
          <p>{this.props.model.get("name")}</p>
        </div>
      </div>
    );
  }
});



module.exports = SearchBrewsListing;
