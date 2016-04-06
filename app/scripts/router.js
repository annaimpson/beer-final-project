var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Backbone = require('backbone');
var Parse = require('parse');

var Login = require('./components/landing-page.jsx');
var HomePage = require('./components/search-page.jsx');
var ClickedBrewery = require('./components/brewery.jsx');
var BreweryCollection = require('./models/models.js').BreweryCollection;
var Profile = require('./components/profile.jsx');
var Map = require('./components/map.jsx');
var breweries = new BreweryCollection();
var appContainer = document.getElementById('app');

var apiHomePage = function(){
  var apiKey = 'http://api.brewerydb.com/v2/key=9b561e70ba317f8d99aaa277053fe0fd';
};


var LoginRouter = Backbone.Router.extend({
  routes: {
    '': 'login',
    'homePage': 'homePage',
    'brewery': 'brewery',
    'profile': 'profile',
    'map': 'map'
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
    breweries.fetch().then(function(){
      ReactDOM.render(
        React.createElement(HomePage, {collection: breweries}), document.getElementById('app')
      );
    });
  },
  brewery: function(){
    ReactDOM.unmountComponentAtNode(appContainer);
    ReactDOM.render(
      React.createElement(ClickedBrewery), document.getElementById('app')
    );
  },
  profile: function(){
    ReactDOM.unmountComponentAtNode(appContainer);
    ReactDOM.render(
      React.createElement(Profile), document.getElementById('app')
    );
  },
  map: function(){
    ReactDOM.unmountComponentAtNode(appContainer);
    ReactDOM.render(
      React.createElement(Map), document.getElementById('app')
    );
  }
});

module.exports = LoginRouter;
