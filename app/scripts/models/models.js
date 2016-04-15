var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Host = 'http://finalprojectbeer.herokuapp.com';
var Host = 'http://localhost:3000';


// var SelectedBreweryCollection = Backbone.Collection.extend({
//   model: SelectedBreweryModel,
//   url: function(){
//     var beerUrl = Host + '/brewery/';
//     return
//   }
// });

var ProfilePicModel = Backbone.Model.extend('ProfilePicModel');

var ProfilePicCollection = Backbone.Collection.extend({
  model: ProfilePicModel,
  url: Host,
  parse: function(data){
    return data;
  }
});

var BreweryModel = Backbone.Model.extend({
  urlRoot: Host + '/brewery/',
  parse: function(data){
    return data.data;
  }
});

var BeerCollection = Backbone.Collection.extend({
  urlRoot: Host + '/brewery/',
  initialize: function(models, options) {
    this.breweryId = options.breweryId;
  },
  url: function(){
    return this.urlRoot + this.breweryId + '/beers';
  },
  parse: function(data){
    return data.data;
  }
});


var BreweryCollection = Backbone.Collection.extend({
  model: Backbone.Model.extend({}),
  url: function(){
    var url = Host + '/breweries/';
    return url + '?' + $.param({p: this.pageNum});
  },
  getPage: function(pageNum){
    this.pageNum = pageNum;
    this.fetch().then(function(data){
      console.log(data);
    }, function(error){
      console.log(error);
    });
    return this;
  },
  getNewBrewery: function(clickedBrewery){
    this.clickedBrewery = clickedBrewery;
  },
  parse: function(data){
    return data.data;
  }
});


var SearchModel = Backbone.Model.extend({
  searchUrl: Host + '/search/',
  parse: function(data){
    return data.data;
  }
});

var SearchCollection = Backbone.Collection.extend({
  model: SearchModel,
  searchUrl: function(){
    var searchUrl = Host + '/search/';
    return searchUrl + '?' + $.param({type: this.searchBreweriesS});
  },
  getNewBreweryPage: function(breweryPage){
    this.searchUrl = searchUrl;

    this.fetch().then(function(data){
      console.log(data);
    }, function(error){
      console.log(error);
    });
    return this;
  }
});

module.exports = {
  'ProfilePicModel': ProfilePicModel,
  'ProfilePicCollection': ProfilePicCollection,
  'BreweryModel': BreweryModel,
  'BreweryCollection': BreweryCollection,
  'SearchModel': SearchModel,
  'SearchCollection': SearchCollection,
  'BeerCollection': BeerCollection
};
