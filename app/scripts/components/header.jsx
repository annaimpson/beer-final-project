var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Mixin = require('backbone-react-component');

var Header = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  handleSearch: function(e){
    e.preventDefault();
    var searchBeer = $('.search-input').val();
    var url = 'http://api.brewerydb.com/v2/search'

    url += '/?key=9b561e70ba317f8d99aaa277053fe0fd';
    url += "&q="+searchBeer;
    url += '&type=beer&withLocations=Y';

    console.log(url);

    fetchJSONP(url, logData);

    function fetchJSONP(url, callback) {
             var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
             var script = document.createElement('script');
             window[callbackName] = function(data) {
                 delete window[callbackName];
                 document.body.removeChild(script);
                 callback(data);
             };
             script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
             document.body.appendChild(script);
         }
     function logData(data){
       console.log('data is: ', data);
       var arrayData = data.results;
       console.log('arrayData is: ', arrayData);
     }
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
        <div className="nav-toggle" style={{"display": "none"}}>
            <button onClick={this.handleProfile} className="nav-button1"><h4 className="profile-toggle">Profile</h4></button>
            <button onClick={this.handleHomePage} className="nav-button2"><h4 className="home-toggle">Home Page</h4></button>
            <button onClick={this.handleMap} className="nav-button3"><h4 className="map-toggle">Map</h4></button>
            <button onClick={this.handleLogout} className="nav-button4"><h4 className="logout-toggle">Logout</h4></button>
        </div>
      </div>
    );
  }
});
module.exports = Header;