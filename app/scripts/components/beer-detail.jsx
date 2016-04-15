var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Header = require('./header.jsx');
require('backbone-react-component');

var BeerDetail = React.createClass({
  getInitialState(){
    return {label:'Drink Up!'}
  },
  handleDrinkUp(e){
    e.preventDefault();
    var user = Parse.User.current();
    this.setState({label: 'On Your Drink List'});
    console.log(Parse.User.current());
  },
  render(){
    var beerDescription;
    if(!this.props.beer.get("style")){
      beerDescription = "";
    }else{
      if (!this.props.beer.get("style").description){
        beerDescription = "";
      }
      else {
        beerDescription = this.props.beer.get("style").description
      }
    };

    var beerAbv;
    if(!this.props.beer.get("style")){
      beerAbv = "";
    }else{
      if (!this.props.beer.get("style").abvMin){
        beerAbv = "";
      }
      else {
        beerAbv = this.props.beer.get("style").abvMin
      }
    };

    var beerLabel;
    if(!this.props.beer.get("labels")){
      beerLabel = "././images/beer-icon.png";
    }else{
      if (!this.props.beer.get("labels").icon){
        beerLabel = "././images/beer-icon.png";
      }
      else {
        beerLabel = this.props.beer.get("labels").icon
      }
    };
    return(
      <div className="beer-info-detail-page">
        <div className="row">
          <div className="col-md-6">
            <img className="beer-label" src={beerLabel} alt="beer is good!!"/>
            <h1 className="beer-name">{this.props.beer.get("name")}</h1>
            <h6 className="beer-abv">abv: {beerAbv}</h6>
          </div>
          <div className="col-md-6">
            <p className="truncate beer-description">{beerDescription}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button onClick={this.handleDrinkUp} className="btn btn-default drinkup-button">{this.state.label}</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BeerDetail;
