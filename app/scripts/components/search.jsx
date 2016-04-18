var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Header = require('./header.jsx');
var Parse = require('parse');
var Mixin = require('backbone-react-component');

var Search = React.createClass({
  render: function(){
    console.log(localStorage.getItem('searchUrl'));
    var BrewSearchList = this.props.BrewSearchList.models.map(function(beerSearch){
      return (
        <div>
          <p>{beerSearch.established}</p>
          <p>{beerSearch.name}</p>
        </div>
      );
    });
    return (
      <div>
        <div className="container-fluid header">
          <div className="row">
            <div className="col-md-12">
              <Header/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className = "col-md-4">
            <p>{this.props.model.get("established")}</p>
            <p>{this.props.model.get("name")}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Search;
