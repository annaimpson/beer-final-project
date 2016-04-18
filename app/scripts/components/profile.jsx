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
      name: 'name',
      description: 'description',
      abvMin: 'abvMin'
    };
  },

  handleFile: function(e) {
   var file = e.target.files[0];
   var images = this.state.images;
   images.push(new Parse.File(file.name, file));
   this.setState({'images': images});
 },

 handleSubmit: function(e){
    e.preventDefault();
    var self = this;
    var router = this.props.router;
    var parseImages = this.state.images.map(function(image){
      image.save();
      return image;
    });
  var userProfile = new model.ProfilePicModel();
    userProfile.set({
      'images': parseImages
    });
    userProfile.save(null, {
      success: function(userProfile) {
        alert('New product created');
      },
      error: function(error) {
        console.log(error);
      }
    });
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
          self.setState({
            favorites: results
          });
        },
        error: function(error) {
          console.log(error);
        }
      });
  },
  render: function(){
    var Username = Parse.User.current().getUsername();
    var Email = Parse.User.current().getEmail();

    var favoritesList;
    if (this.state.favorites.length == 0){
      favoritesList = "";
    }else{
      var favoritesList = this.state.favorites.map(function(eachbeer){
        var beer = eachbeer.attributes;
        return(
          <div className="favorite-beer-info">
            <div className="row">
              <div className="col-md-6">
                <img className="brewery-icon-detail-page" src={localStorage.getItem('labels')} alt="beer is good!!"/>
                <p className="favorite-beer-name">{beer.name}</p>
                <h6 className="favorite-beer-abvMin">{beer.abvMin}</h6>
              </div>
              <div className="col-md-6">
                <p className="favorite-beer-description">{beer.description}</p>
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
                <img className="empty-profile-pic" src="images/blank-profile.png" alt=""/>
                  <input type="file" onChange={this.handleFile} className="btn btn-default add-button"/>
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
        <div className="container profile-beers">
          <div className="row">

            <div className="col-md-12">
              <div className="favorites-list">
                {favoritesList}
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
