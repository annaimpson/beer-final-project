var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');

var BeerModel = Parse.Object.extend({
});


var BeerCollection = Backbone.Collections.extend({
  model: BeerModel,
  url: 'http://drinkupapp.herokuapp.com/'
});


var BreweryModel = Backbone.Model.extend({
});


var BreweryCollection = Backbone.Collections.extend({
  model: BreweryModel,
  url: 'http://drinkupapp.herokuapp.com/breweries'
});

module.exports = {
  'BeerModel': BeerModel,
  'BeerCollection': BeerCollection,
  'BreweryModel': BreweryModel,
  'BreweryCollection': BreweryCollection
};
