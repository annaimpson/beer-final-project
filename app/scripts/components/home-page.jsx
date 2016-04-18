var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Mixin = require('backbone-react-component');
var SearchModel = require('../models/models.js').SearchModel;
var Header = require('./header.jsx');


var PageLink= React.createClass({
  getNewPage: function(e){
    e.preventDefault();
    this.props.getNewPage(this.props.index);
    console.log(this);
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
  render: function(){
    var BreweryList = this.props.collection.map(function(model){
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
    var pageLinks = [];
    var numpages = 5;
    for (var i=1; i<numpages; i++){
      pageLinks.push(
        <PageLink
          index={i}
          key={i}
          getNewPage={this.getNewPage}
        />
      )
    }

    return(
      <div>
        <div className="container-fluid header">
          <div className="row">
            <div className="col-md-12">
              <Header/>
            </div>
          </div>
        </div>
        <div className="container latest-breweries-list">
          <div className="row">
            {BreweryList}
          </div>
          <div className="row">
            <nav>
              <ul className="pagination pagination-buttons">
                <li>
                  <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {pageLinks}
                <li>
                  <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
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
