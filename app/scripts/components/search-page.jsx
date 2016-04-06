var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Mixin = require('backbone-react-component');


var searchAndNav = React.createClass({
  mixins: [Backbone.React.Component.mixin],
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
    console.log(this.props.collection)
    console.log(this.props.collection.models[0].get('data'));
    var BreweryList = this.props.collection.models[0].get('data').map(function(model){
      console.log(model.description)
      return(
        <NewBreweries
          description={model.description}
          name={model.name}
          key={model.id}

          />
      )
    });

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
        {BreweryList}
      </div>
    );
  }
});

var NewBreweries = React.createClass({
  render: function(){
    return(
      <div>
        <div className="container brewery-render">
          <div className="row">
            <div className="col-md-4">
              <p>{this.props.name}</p>
              <p>{this.props.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = searchAndNav
