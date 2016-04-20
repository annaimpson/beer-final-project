var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Header = require('./header.jsx');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var model = require('../models/models.js');
require('backbone-react-component');

var ProfilePage = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return {
      favorites: [],
      icon: ['icon'],
      nameDisplay: 'nameDisplay',
      description: 'description',
      abvMin: 'abvMin',
      file: '',
      images: null,
    };
  },

  handleFavorite: function(){
    var user = Parse.User.current();
  },

  componentDidMount: function(){
    var BeerFavorite = Parse.Object.extend('FavoriteBeer');
    var self = this;
      var beerquery = new Parse.Query(BeerFavorite);
      beerquery.equalTo("User", Parse.User.current());
      beerquery.find({
        success: function(results) {
          console.log(results);
          self.setState({
            favorites: results
          });
        },
        error: function(error) {
          console.log(error);
        }
      });
    var profilePicture = Parse.User.current().get('Images').toJSON().url;
      this.setState({
        images: profilePicture,
    });
  },

  handleUploadProfilePicture: function(e){
    var self = this;
    var file = e.target.files[0];
    this.setState({'Images': file});
    console.log('file', file);
    var name = file.name;
    var parseFile = new Parse.File(name, file);
    parseFile.save().then(function(result){
      var user = Parse.User.current();
      user.set('Images', result);
      user.save();
    });
  },

  handleSubmit: function(e){
    e.preventDefault();
  },

  handleRemove:function(beer){
    console.log(beer.id);
    console.log('Clicked!');
    var object = beer.id
    var collection = Parse.Object.extend("FavoriteBeer");
    var query = new Parse.Query(collection);
    query.get(object, {
      success: function(object){
        object.destroy({});
        console.log('model destroyed');
      },
      error: function(error) {
        console.log(error);
      }
    })
  },

  render: function(){
    var Username = Parse.User.current().getUsername();
    var Email = Parse.User.current().getEmail();
    var self = this;

    var favoritesList;
    if (this.state.favorites.length == 0){
      favoritesList = "";
    }else{
      var favoritesList = this.state.favorites.map(function(eachbeer){
        var image;
        if(!eachbeer.get("labels")){
          image = "././images/pint.png";
        }else{
          if (!eachbeer.get("labels").icon){
            image = "././images/pint.png";
          }
          else {
            image = eachbeer.get("labels").icon
          }
        };

        var beer = eachbeer.attributes;
        console.log(eachbeer.get('description'));
        var beerID = eachbeer.id
        return(
          <div key={beerID}>
            <div className="favorite-beer-info">
              <div className="row">
                <div className="col-md-12">
                  <button className="remove-button" onClick={self.handleRemove.bind(self, eachbeer)}>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                  </button>
                  <p className="favorite-beer-name">{beer.name}</p>
                  <h6 className="favorite-beer-abvMin">abv: {beer.abvMin}</h6>
                  <p className="favorite-beer-description">{beer.description}</p>
                  <img className="favorite-brewery-icon" src={image} alt="beer is good!!"/>
                </div>
              </div>
            </div>
          </div>
        )
      });
    };
    return(
      <div>
        <div className="container-fluid header">
          <div className="row">
            <div className="col-md-12">
              <Header/>
            </div>
          </div>
        </div>

        <div className="container profile-body">
          <div className="row">
            <div className="col-md-6">
              <div className="picture">
                <img className="profile-pic" src={this.state.images} alt=""/>
                  <input type="file" onChange={this.handleUploadProfilePicture} className="btn btn-default add-button"/>
                  <button type="button" onClick={this.handleSubmit} type="submit" className="btn btn-default submit-picture-button"><a href="#createproduct">Submit</a></button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="user-info">
                <div className="username">{Username}</div>
                <div className="email">{Email}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="favorites-background">
          <div className="container profile-beers">
            <div className="row">
              <div className="col-md-12">
                <div className="favorites-list">
                  <h1 className="my-drinks">My Drinks</h1>
                    {favoritesList}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

var UserInfo = React.createClass({
  render: function(){
    return(
      <div className="col-md-4">
        <h4 className="users-name">{this.props.Username}</h4>
        <h4 className="users-emal">{this.props.Email}</h4>
      </div>
    );
  }
});

module.exports = ProfilePage;
