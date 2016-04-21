var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Parse = require('parse');
var Header = require('./header.jsx');
var BeerDetail = require('./beer-detail.jsx');
var FavoriteBeer = require('../models/models.js').FavoriteBeer;

require('backbone-react-component');

var BreweryDetail = React.createClass({
  getInitialState: function(){
    return {favorites: []}
  },
  componentWillMount: function() {
    var self = this;
    var favoriteSearch = new Parse.Query(FavoriteBeer);
    favoriteSearch.equalTo("User", Parse.User.current());
    favoriteSearch.find({
      success: function(results){
        var ids = [];
        results.forEach(function(result){
          ids.push(result.get("beerId"))
        })
        self.setState({favorites: ids});
      }
    })
  },
  render: function(){

    var that = this;
    var beerList = this.props.beerList.models.map(function(beer){
      var favorited = _.contains(that.state.favorites, beer.id);
      return (
        <BeerDetail
          key={beer.id}
          beer={beer}
          favorited={favorited}
        />
      )
    });
    return(
      <div>
        <div className="container-fluid header">
          <div className="row">
            <div className="col-md-12">
              <Header/>
            </div>
          </div>
        </div>
        <div className="brewery-body">
          <div className="container">
            <div className="row">
              <div className="col-xs-6 col-sm-12 hide-md detail-brewery-info">
                <div className="brewery-info">
                  <div className="brewery-name-page">{this.props.model.get("name")}</div>
                  <div className="brewery-established-page">{this.props.model.get("established")}</div>
                  <p className="brewery-description-page">{this.props.model.get("description")}</p>
                  <img className="brewery-icon-detail-page" src={localStorage.getItem('image')} alt="beer is good!!"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="beers-background">
          <div className="container">
            <div className="row">
              {beerList}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BreweryDetail;
