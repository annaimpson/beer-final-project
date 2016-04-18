var React = require('react');
var _ = require('underscore');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Header = require('./header.jsx');
var Parse = require('parse');
var Mixin = require('backbone-react-component');

var Search = React.createClass({
  mixins: [Backbone.React.Component.Mixin],
  render: function(){
    console.log(this.props.collection);
    var BrewSearchList = this.props.collection.map(function(beerSearch){
      var name;
      if(!beerSearch.get("style")){
        name = "";
      }else{
        if (!beerSearch.get("style").name){
          name = "";
        }
        else {
          name = beerSearch.get("style").name
        }
      };
      var description;
      if(!beerSearch.get("attributes")){
        description = "";
      }else{
        if (!beerSearch.get("attributes").description){
          description = "";
        }
        else {
          description = beerSearch.get("attributes").description
        }
      };
      return (
        <div key={beerSearch.id}>
          {description}
          {name}
        </div>
      ) ;
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
            {BrewSearchList}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Search;
