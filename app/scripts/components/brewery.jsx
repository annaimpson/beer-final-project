var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Header = require('./header.jsx');
var BeerDetail = require('./beer-detail.jsx');
require('backbone-react-component');

var BreweryDetail = React.createClass({

  render: function(){
    var that = this;
    var beerList = this.props.beerList.models.map(function(beer){
      return (
        <BeerDetail
          key={beer.id}
          beer={beer}
        />
      )
    });
    return(
      <div>
        <div className="container-fluid header">
          <div className="row">
            <div className="col-md-12">
              <Header/>
            </div>
          </div>
        </div>
        <div className="brewery-body">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="brewery-info">
                  <div className="brewery-name-page">{this.props.model.get("name")}</div>
                  <div className="brewery-established-page">{this.props.model.get("established")}</div>
                  <p className="brewery-description-page">{this.props.model.get("description")}</p>
                </div>
                <img className="brewery-icon-detail-page" src={localStorage.getItem('image')} alt="beer is good!!"/>
              </div>
            </div>
          </div>
        </div>
        <div className="beers-background">
          <div className="container">
            <div className="row">
              {beerList}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BreweryDetail;
