var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');

var BeerModel = Parse.Object.extend({
});


var BeerCollection = Backbone.Collections.extend({
  model: BeerModel,
  url: 'http://drinkupapp.herokuapp.com/'
});

module.exports = {
  'BeerModel': BeerModel,
  'BeerCollection': BeerCollection
};
