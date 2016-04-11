var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Mixin = require('backbone-react-component');

{/*var SearchBrewsListing = React.createClass({
  render: function(){
    var BrewList = this.props.collection.map(function(model){
      return (
        <SearchBrews model = {model} key={model.get('name')} />
      )
    });
    return (
      <div className="row">
        {BrewList}
      </div>
    );
  }
});*/}

{/*var SearchBrews = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    console.log(this.props.model);
    return(
      <div>
        <div className = "col-md-4">
          <p>{this.props.model.get('searchBeer')} alt="beer is good!!"</p>
          <p>{this.props.model.get('zipcode')}</p>
        </div>
      </div>
    );
  }
});*/}
