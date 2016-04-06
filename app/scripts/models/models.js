var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
//
// var BeerModel = Parse.Object.extend({
//   className: 'BeerList'
// });
//
//
// var BeerCollection = Backbone.Collections.extend({
//   model: BeerModel,
//   url: 'http://drinkupapp.herokuapp.com/'
// });


var BreweryModel = Backbone.Model.extend({
});


var BreweryCollection = Backbone.Collection.extend({
  model: BreweryModel,
  url: 'http://finalprojectbeer.herokuapp.com/breweries'
});

module.exports = {
  // 'BeerModel': BeerModel,
  // 'BeerCollection': BeerCollection,
  'BreweryModel': BreweryModel,
  'BreweryCollection': BreweryCollection
};
