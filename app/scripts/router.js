var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Backbone = require('backbone');
var Parse = require('parse');

var Login = require('./components/landing-page.jsx');
var HomePage = require('./components/home-page.jsx');
var Search = require('./components/search.jsx');
var Brewery = require('./components/brewery.jsx');
var BreweryModel = require('./models/models.js').BreweryModel;
var BreweryCollection = require('./models/models.js').BreweryCollection;
var BeerCollection = require('./models/models.js').BeerCollection;
var SearchCollection = require('./models/models.js').SearchCollection;
var Profile = require('./components/profile.jsx');

var appContainer = document.getElementById('app');

var apiHomePage = function(){
  var apiKey = 'http://api.brewerydb.com/v2/key=9b561e70ba317f8d99aaa277053fe0fd';
};


var LoginRouter = Backbone.Router.extend({
  routes: {
    '': 'login',
    'homePage': 'homePage',
    'brewery/:id': 'brewery',
    'searchResults/:searchTerm': 'searchResults',
    'profile': 'profile',
  },
  login: function(){
    ReactDOM.unmountComponentAtNode(appContainer);

    ReactDOM.render(
      React.createElement(Login), document.getElementById('app')
    );
  },

  homePage: function(){
    ReactDOM.unmountComponentAtNode(appContainer);
    apiHomePage();
    var breweries = new BreweryCollection();
    breweries.fetch().then(function(){
      ReactDOM.render(
        React.createElement(HomePage, {collection: breweries}), document.getElementById('app')
      );
    });
  },
  brewery: function(id){
    ReactDOM.unmountComponentAtNode(appContainer);
    var beerCollection = new BeerCollection([], {breweryId: id});
    var selectedBrewery = new BreweryModel({id: id});
    selectedBrewery.fetch().then(function(){
      beerCollection.fetch().then(function(){
        ReactDOM.render(
          React.createElement(Brewery, {model: selectedBrewery, beerList: beerCollection}), document.getElementById('app')
        );
      });
    });
  },
  searchResults: function(searchTerm, id){
    ReactDOM.unmountComponentAtNode(appContainer);
    var searchedBeer = new SearchCollection([], {searchTerm: searchTerm});
    searchedBeer.fetch().then(function(){
      ReactDOM.render(
        React.createElement(Search, {collection: searchedBeer}), document.getElementById('app')
      );
    });
  },
  profile: function(){
    ReactDOM.unmountComponentAtNode(appContainer);
    ReactDOM.render(
      React.createElement(Profile), document.getElementById('app')
    );
  }
});

module.exports = LoginRouter;
