var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Header = require('./header.jsx');
require('backbone-react-component');

var MapPage = React.createClass({
  render: function(){
    return(
      <div>
        <div className="container-fluid header">
          <div className="row">
            <div className="col-md-12">
              {Header}
            </div>
          </div>
        </div>
        <div className="container map-render">
          <div className="row">
            <div className="col-md-12"></div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = MapPage;
