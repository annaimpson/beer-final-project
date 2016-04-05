var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Backbone = require('backbone');
var Parse = require('parse');

var Login = require('./components/landing-page.jsx');
var HomePage = require('./components/search-page.jsx');

var appContainer = document.getElementById('app');



var LoginRouter = Backbone.Router.extend({
  routes: {
    '': 'login',
    'homePage': 'homePage'
  },
  login: function(){
    ReactDOM.unmountComponentAtNode(appContainer);

    ReactDOM.render(
      React.createElement(Login), document.getElementById('app')
    );
  },

  homePage: function(){
    ReactDOM.unmountComponentAtNode(appContainer);

    ReactDOM.render(
      React.createElement(HomePage), document.getElementById('app')
    );
  }
});

module.exports = LoginRouter;
