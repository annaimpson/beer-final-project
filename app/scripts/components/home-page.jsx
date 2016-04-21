var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Mixin = require('backbone-react-component');
var SearchModel = require('../models/models.js').SearchModel;
var Header = require('./header.jsx');


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

var searchAndNav = React.createClass({
  getInitialState: function(){
    return {
      collection: this.props.collection,
      currentPage: this.props.currentPage
    }
  },
  getNewPage: function(pageNumber){
    var self = this;
    this.state.collection.getPage(pageNumber).then(function(data){
      self.setState({collection: self.state.collection, currentPage: pageNumber})
    });
  },
  render: function(){
    var BreweryList = this.state.collection.map(function(model){
    var image;
    if(!model.get("images")){
      image = "././images/pint.png";
    }else{
      if (!model.get("images").icon){
        image = "././images/pint.png";
      }
      else {
        image = model.get("images").icon
      }
    };
      return(
        <NewBreweries
          model={model}
          established={model.established}
          name={model.name}
          key={model.id}
          image={image}
        />
      )
    });
    var currentPage = this.state.currentPage;
    var offset = currentPage > 5 ? 0 : -5;
    var pageLinks = [];
    var previous = currentPage - 1;
    var next = currentPage + 1;
    var first = currentPage == 1;
    var numpages = this.props.numberOfPages;
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
        <div className="home-page-background">
          <div className="container latest-breweries-list">
            <div className="row brewery-list-row">
              {BreweryList}
            </div>
            <div className="row">
              <nav>
                <ul className="pagination pagination-buttons">
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

var NewBreweries = React.createClass({
  handleSpecificBrew: function(model){
    var selectedBrewery = new SelectedBrewery();
    selectedBrewery.set('model', model);
    Backbone.history.navigate('brewery', {trigger: true})
  },

  setImage: function(){
    localStorage.setItem('image', this.props.image)
  },

  render: function(){
    return(
      <div className="col-md-4 latest-brewery-info">
        <a className="brewery-button" onClick={this.setImage} href={"#brewery/" + this.props.model.id}>
          <img className="brewery-icon" src={this.props.image} alt="beer is good!!"/>
          <p className="latest-brewery-name">{this.props.model.get("name")}</p>
          <p className="latest-brewery-established">{this.props.model.get("established")}</p>
        </a>
      </div>
    );
  }
});


module.exports = searchAndNav;
