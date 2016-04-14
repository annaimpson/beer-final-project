var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Header = require('./header.jsx');
require('backbone-react-component');

var BreweryDetail = React.createClass({
  handleDrinkUp: function(e){
    e.preventDefault();
    console.log("I was clicked!");
  },
  render: function(){
    var that = this;
    var beerList = this.props.beerList.models.map(function(beer){
      console.log(beer);
      var beerDescription;
      if(!beer.get("style")){
        beerDescription = "";
      }else{
        if (!beer.get("style").description){
          beerDescription = "";
        }
        else {
          beerDescription = beer.get("style").description
        }
      };

      var beerLabel;
      if(!beer.get("labels")){
        beerLabel = "././images/beer-icon.png";
      }else{
        if (!beer.get("labels").icon){
          beerLabel = "././images/beer-icon.png";
        }
        else {
          beerLabel = beer.get("labels").icon
        }
      };

      return (
        <div className="beer-info-detail-page" key={beer.id}>
          <div className="row">
            <div className="col-md-6">
              <img className="beer-label" src={beerLabel} alt="beer is good!!"/>
              <h1 className="beer-name">{beer.get("name")}</h1>
            </div>
            <div className="col-md-6">
              <p className="truncate beer-description">{beerDescription}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button type="button" onClick={that.handleDrinkUp} className="btn btn-default drinkup-button">Drink Up</button>
            </div>
          </div>
        </div>
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
        <div className="container brewery-body">
          <div className="row">
            <div className="col-md-6">
              <img className="brewery-icon-detail-page" src={localStorage.getItem('image')} alt="beer is good!!"/>
            </div>
            <div className="col-md-6">
              <div className="brewery-info">
                <div className="brewery-name-page">{this.props.model.get("name")}</div>
                <div className="brewery-established-page">{this.props.model.get("established")}</div>
                <p className="brewery-description-page">{this.props.model.get("description")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container brewery-beers">
          <div className="row">
              {beerList}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BreweryDetail;
