var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
require('backbone-react-component');

Parse.initialize('beer-app');
Parse.serverURL = 'http://drinkupapp.herokuapp.com/';


var LandingPageBody = React.createClass({
  render: function(){
    return(
      <div>
        <div clasName="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className='carousel-spot'>
                <img className="header-photo" src="http://unsplash.it/2100/1000" alt=''/>
                <h1 className='page-name'>My Title</h1>
              </div>
            </div>
          </div>
        </div>

        <div className='container beer-info'>
          <div className='row'>
            <div className='col-md-3 yeast'>
              <img className='yeast-photo' src='http://unsplash.it/200/200' alt=''/>
              <p className='yeast-info'>Yeast is the magic ingredient of beer. It is what actually “makes” beer. A single celled organism from the fungus family, yeast eats at the sugars that were derived from the malt, and breaks them down into carbon dioxide and alcohol. This natural process is called fermentation and it is how all alcoholic liquor starts. There are hundreds of different brewer’s yeasts, but they can be divided into two main classes: ale yeast and lager yeast.</p>
            </div>
            <div className='col-md-3 hops'>
              <img className='hops-photo' src='http://unsplash.it/200/200' alt=''/>
              <p className='hops-info'>Hops provide at least three benefits to beer; bitterness (flavor), aroma, and to a lesser extent, preservative qualities. Hops are used to impart a bitter flavor to the beer, which counteracts or balances the sweetness of the malted barley. The result is a well balanced product. Some beers have fewer hops, like our Yellow Armadillo Wheat, leaving the crisp, tangy character of the wheat malt to dominate. Other beers have more hops, such as our Bucket Head India Pale Ale. We want these beers to have the dominant bitterness and aroma of the hops to stand out</p>
            </div>
            <div className='col-md-3 barley'>
              <img className='barley-photo' src='http://unsplash.it/200/200' alt=''/>
              <p className='barley-info'>Barley provides sugars that yeast will convert into carbon dioxide and alcohol. The standard barley used in making beer is pale malt, other types of barley are also used in the brewing process; we often refer to them as specialty grains. </p>
            </div>
          </div>
        </div>


        <div className='container users'>
          <div className="row">
            <div className="col-md-6">
              <div className='signin'>
                <form id="signin" className="form-signin">
                  <input type='text' className='form-control signin-username' placeholder='username'/>
                  <input type='password' className='form-control signin-password' placeholder='password'/>
                </form>
                <button type='button' className='btn btn-default signin-button'>Sign In</button>
              </div>
            </div>
            <div className="col-md-6 signup">
              <form id="signup" className="form-signup">
                <input type='text' className='form-control signup-name' placeholder='name'/>
                <input type='text' className='form-control signup-email' placeholder='email'/>
                <input type='text' className='form-control signup-username' placeholder='username'/>
                <input type='password' className='form-control signup-password' placeholder='password'/>
              </form>
              <button type='button' className='btn btn-default'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LandingPageBody;
