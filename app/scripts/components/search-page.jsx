var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');


var searchAndNav = React.createClass({
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
                </div>
                <div className="col-md-4">
                  <button type="button" className="btn btn-default btn-lg nav-button">
                    <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-toggle">
          <button><h4 className="profile-toggle">Profile</h4></button>
          <button><h4 className="home-toggle">Home Page</h4></button>
          <button><h4 className="map-toggle">Map</h4></button>
          <button><h4 className="logout-toggle">Logout</h4></button>
        </div>
        <div className="container brewery-render">
          <div className="row">
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = searchAndNav
