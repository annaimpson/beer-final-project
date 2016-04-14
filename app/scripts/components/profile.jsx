var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Header = require('./header.jsx');
require('backbone-react-component');

var ProfilePage = React.createClass({
  render: function(){
    console.log(Parse.User.current());
    var Username = Parse.User.current().getUsername();
    var Email = Parse.User.current().getEmail();
    console.log(Username);
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
