var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

var ProfilePage = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  handleSearch: function(){
    var searchBeer = $('.search-input').val();
    var searchLocation = $('.search-input').val();
    Backbone.history.navigate('searchResults', {trigger: true});
    this.props.collection.create({
      beer: searchBeer,
      zipcode: searchLocation
    });
  },
  handleToggle: function(e){
    e.preventDefault();
    $('.nav-toggle').slideToggle({direction: "right"}, 2000);
  },
  handleProfile: function(){
    Backbone.history.navigate('profile', {trigger: true});
  },

  handleHomePage: function(){
    Backbone.history.navigate('homePage', {trigger: true});
  },

  handleMap: function(){
    Backbone.history.navigate('map', {trigger: true});
  },
  handleLogout: function(){
    Parse.User.logOut();
    Backbone.history.navigate('', {trigger: true});
  },

  render: function(){
    console.log(Parse.User.current());
    var Username = Parse.User.current().getUsername();
    var Email = Parse.User.current().getEmail();
    console.log(Username);
    return(
      <div>
        <div className="container search-header">
          <div className="row">
            <div className="search-bar">
              <div className="row">
                <div className="col-md-8">
                  <form>
                    <input type="text" className="form-control search-input" placeholder="Search"/>
                  </form>
                  <button onClick={this.handleSearch} type="button" className="btn btn-primary submit-button-homepage">Submit</button>
                </div>
                <div className="col-md-4">
                  <div className="mainNavDropDown clearfix">
                    <button onClick={this.handleToggle} type="button" className="btn btn-default btn-lg nav-button">
                      <span className="glyphicon glyphicon-align-justify hamburger" aria-hidden="true"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-toggle">
          <button onClick={this.handleProfile} className="nav-button1"><h4 className="profile-toggle">Profile</h4></button>
          <button onClick={this.handleHomePage} className="nav-button2"><h4 className="home-toggle">Home Page</h4></button>
          <button onClick={this.handleMap} className="nav-button3"><h4 className="map-toggle">Map</h4></button>
          <button onClick={this.handleLogout} className="nav-button4"><h4 className="logout-toggle">Logout</h4></button>
        </div>
        <div className="container profile-body">
          <div className="row">
            <div className="col-md-6">
              <div className="picture">
                <img className="empty-profile-pic" src="images/blank-profile.png" alt=""/>
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
              <div className="favorites-list"></div>
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
