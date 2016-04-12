var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');


var BreweryModel = Backbone.Model.extend({
});


var BreweryCollection = Backbone.Collection.extend({
  model: BreweryModel,
  url: function(){
    var url = 'http://finalprojectbeer.herokuapp.com/breweries/';
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
  }
});





var SearchModel = Backbone.Model.extend({
});

var SearchCollection = Backbone.Collection.extend({
  model: SearchModel,
  searchUrl: function(){
    var searchUrl = 'http://finalprojectbeer.herokuapp.com/search/';
    return searchUrl + '?' + $.param({type: this.breweryPage});
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
  'BreweryModel': BreweryModel,
  'BreweryCollection': BreweryCollection,
  'SearchModel': SearchModel,
  'SearchCollection': SearchCollection
};
