var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Header = require('./header.jsx');
var FavoriteBeer = require('../models/models.js').FavoriteBeer;
require('backbone-react-component');

var BeerDetail = React.createClass({
  getInitialState(){
    console.log(this.props.beer.attributes);
    return {label:'Drink Up!'}
  },
  setImage: function(){
    localStorage.setItem('labels', this.props.labels)
  },

  handleDrinkUp(beer, e){
    e.preventDefault();
    var favoriteBeer = new FavoriteBeer();
    var user = Parse.User.current();
    favoriteBeer.set('User', user);
    favoriteBeer.set('name', beer.get('name'));

    if(!beer.get('style')){
      favoriteBeer.set('description', '');
    } else if(!beer.get('style').description){
      favoriteBeer.set('description', '');
    } else{
      favoriteBeer.set('description', beer.get('style').description);
    };

    if(!beer.get('style')){
      favoriteBeer.set('abvMin', '');
    } else if(!beer.get('style').abvMin){
      favoriteBeer.set('abvMin', '');
    } else{
      favoriteBeer.set('abvMin', beer.get('style').abvMin);
    };

    if(!beer.get('labels')){
      favoriteBeer.set('icon', '');
    } else if(!beer.get('labels').icon){
      favoriteBeer.set('icon', '');
    } else{
      favoriteBeer.set('icon', beer.get('labels').icon);
    };

    favoriteBeer.save(null, {
      success: function(favorite){
        console.log(favorite);
      },
      error: function(error){
        console.log(error);
      }
    });
    this.setState({label: 'On Your Drink List'});
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
      beerLabel = "././images/pint.png";
    }else{
      if (!this.props.beer.get("labels").icon){
        beerLabel = "././images/pint.png";
      }
      else {
        beerLabel = this.props.beer.get("labels").icon
      }
    };
    return(
      <div className="beer-info-detail-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="beer-name">{this.props.beer.get("name")}</h1>
            <h6 className="beer-abv">abv: {beerAbv}</h6>
            <p className="truncate beer-description">{beerDescription}</p>
            <img className="beer-label" src={beerLabel} alt="beer is good!!"/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button onClick={this.handleDrinkUp.bind(this, this.props.beer)} className="btn btn-default drinkup-button-detail">{this.state.label}</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BeerDetail;
