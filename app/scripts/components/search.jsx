var React = require('react');
var _ = require('underscore');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Header = require('./header.jsx');
var FavoriteBeer = require('../models/models.js').FavoriteBeer;
var Parse = require('parse');
var Mixin = require('backbone-react-component');


var PageLink= React.createClass({
  getNewPage: function(e, index){
    e.preventDefault();
    this.props.getNewPage(this.props.index);
  },
  getNewBreweryPage: function(breweryPage){
    var searchedBeer = new SearchModel();
    searchedBeer.set('name', beer.get('name'));
    Backbone.history.navigate('searchResults', {trigger: true});
    searchedBeer.save(null, {
      success: function(search){
        console.log(search);
      },
      error: function(error){
        console.log(error);
      }
    });
  },
  render: function(){
    return (
      <li>
        <a href={this.props.index} onClick={this.getNewPage}>
          {this.props.index}
        </a>
      </li>
    );
  }
});
var Search = React.createClass({
  mixins: [Backbone.React.Component.Mixin],
  getInitialState(){
    return {
      label:'Drink Up!',
      collection: this.props.collection,
      currentPage: this.props.currentPage,
      favorited: ""
    }
  },
  getNewPage: function(pageNumber){
    var self = this;
    this.state.collection.getPage(pageNumber).then(function(data){
      self.setState({collection: self.state.collection, currentPage: pageNumber})
    });
  },
  handleFavorite: function(beerSearch, event){
    event.target.innerHTML = 'On Your Drink List';
    console.log('beer Search', beerSearch);
    var favoriteBeer = new FavoriteBeer();
    var user = Parse.User.current();
    favoriteBeer.set('User', user);
    favoriteBeer.set('name', beerSearch.get('nameDisplay'));
    favoriteBeer.set('description', beerSearch.get('description'));
    if(!beerSearch.get('labels')){
      favoriteBeer.set('icon', '');
    } else if(!beerSearch.get('labels').icon){
      favoriteBeer.set('icon', '');
    } else{
      favoriteBeer.set('icon', beerSearch.get('labels').icon);
    };
    favoriteBeer.set('abvMin', beerSearch.get('style').abvMin);
    favoriteBeer.save(null, {
      success: function(favorite){
        console.log('favorite', favorite);
      },
      error: function(error){
        console.log(error);
      }
    });

  },

  render: function(){
    var self = this;
    var BrewSearchList = this.props.collection.map(function(beerSearch){
      var name;
      if(!beerSearch.get("nameDisplay")){
        name = "";
      } else {
          name = beerSearch.get("nameDisplay")
      }

      var description;
      if(!beerSearch.get("description")){
        description = "";
      } else {
          description = beerSearch.get("description")
      }

      var abvMin;
      if(!beerSearch.get("style")){
        abvMin = "";
      }else{
        if (!beerSearch.get("style").abvMin){
          abvMin = "";
        }
        else {
          abvMin = beerSearch.get("style").abvMin
        }
      };
      var icon;
      if(!beerSearch.get("labels")){
        icon = "././images/pint.png";
      }else{
        if (!beerSearch.get("labels").icon){
          icon = "././images/pint.png";
        }
        else {
          icon = beerSearch.get("labels").icon
        }
      };
      return (
        <div key={beerSearch.id}>
          <div className="beer-search-info">
            <div className="col-md-6">
              <div className="searched-beer">
                <img className="beer-search-label" src={icon} alt="beer is good!!"/>
                <h1 className="beer-search-name">{name}</h1>
                <h6 className="beer-search-abv">abv: {abvMin}</h6>
                <p className="beer-search-description">{description}</p>
                <button className="btn btn-default drinkup-button-search" onClick={self.handleFavorite.bind(self, beerSearch)}>{self.state.label}</button>
              </div>
            </div>
          </div>
        </div>
      );
    });
    var currentPage = this.state.currentPage;
    var offset = currentPage > 5 ? 0 : -5;
    var pageLinks = [];
    var previous = currentPage - 1;
    var next = currentPage + 1;
    var first = currentPage == 1;
    for (var i = currentPage  ; i < currentPage + 5 ; i++){
      pageLinks.push(
        <PageLink
          index={i}
          key={i}
          getNewPage={this.getNewPage}
        />
      )
    }
    return (
      <div>
        <div className="container-fluid header">
          <div className="row">
            <div className="col-md-12">
              <Header/>
            </div>
          </div>
        </div>
        <div className="brew-search-background">
          <div className="container brew-search-container">
            <div className="row">
              <div className="col-xs-12 col-md-12">
                <div className="row">
                  {BrewSearchList}
                </div>
              </div>
            </div>
            <div className="row pagination-buttons-search">
              <nav>
                <ul className="pagination">
                  <li>
                    <a href="#" aria-label="First">
                      <span aria-hidden="true">&laquo;&laquo;</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo; Prev</span>
                    </a>
                  </li>
                  {pageLinks}
                  <li>
                    <a href="#" aria-label="Next">
                      <span aria-hidden="true">Next &raquo;</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" aria-label="Last">
                      <span aria-hidden="true">&raquo;&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Search;
