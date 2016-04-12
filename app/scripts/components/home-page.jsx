var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Mixin = require('backbone-react-component');

var PageLink= React.createClass({
  getNewPage: function(e){
    e.preventDefault();
    this.props.getNewPage(this.props.index);
    console.log(this.props.index);
  },
  render: function(){
    return (
      <li>
        <a href={this.props.index} onClick={this.getNewPage}>{this.props.index}</a>
      </li>
    );
  }
});

var searchAndNav = React.createClass({
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
  getNewPage: function(pageNum){
    var breweries = this.props.collection;
    breweries.getPage(pageNum);
    console.log("this working", pageNum);
  },
  render: function(){

    var BreweryList = this.props.collection.models[0].get('data').map(function(model){
    var image;
    if(!model.images){
      image = "././images/beer-icon.png";
    }else{
      if (!model.images.icon){
        image = "././images/beer-icon.png";
      }
      else {
        image = model.images.icon
      }
    };
      return(
        <NewBreweries
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
  handleSpecificBrew: function(){
    Backbone.history.navigate('brewery', {trigger: true});
  },

  render: function(){
    return(
      <div className="col-md-4 latest-brewery-info">
        <button className="brewery-button" onClick={this.handleSpecificBrew}>
          <img className="brewery-icon" src={this.props.image} alt="beer is good!!"/>
          <p className="latest-brewery-name">{this.props.name}</p>
          <p className="latest-brewery-established">{this.props.established}</p>
        </button>
      </div>
    );
  }
});


module.exports = searchAndNav;
