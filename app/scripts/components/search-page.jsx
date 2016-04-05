var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');


var searchAndNav = React.createClass({
  render: function(){
    return(
      <div class="row">
        <div class="search-bar">
          <div class="row">
            <div class="col-md-8">
              <form>
               <input type="text" class="form-control search-input" placeholder="Search"/>
              </form>
            </div>
            <div class="col-md-4">
              <button type="button" class="btn btn-default btn-lg nav-button">
                <span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = searchAndNav
