var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Parse = require('parse');
var Carousel = require('react-bootstrap').Carousel;
require('backbone-react-component');

Parse.initialize('beer-app');
Parse.serverURL = 'http://drinkupapp.herokuapp.com/';


var LandingPageBody = React.createClass({
  handleSignUp: function(){
    console.log('handleSignUp');

      var user = new Parse.User();
      user.set({'name': $('#signup-name').val(), 'email': $('#signup-email').val(), 'username': $('#signup-username').val(), 'password': $('#signup-password').val()});
      user.signUp(null, {
        'success': function(results){
          console.log('results: ', results);
          Backbone.history.navigate('homePage', {trigger: true});
        },
        'error': function(user, error){
          console.log(user, error);
        }
      });
  },
  handleSignIn: function(){
  console.log('handleSignIn');
    Parse.User
      .logIn($('#signin-username').val(), $('#signin-password').val(), {
        success: function(user) {
          console.log(user);
          Backbone.history.navigate('homePage', {trigger: true});
        },
        error: function(user, error) {
        }
      });
      //doing stuff!
    console.log(Parse.User.current());
  },

  render: function(){
    return(
      <div>
        <div className="row carousel-row">
          <div className="col-xs-12">
            <div className='carousel-spot'>
              <Carousel className="landing-page-carousel">
                <Carousel.Item className="logo-page">
                  <div className="row landing-page-carousel">
                    <img className="goblet-icon-logo" width={200} height={200} alt="" src="images/goblet.png"/>
                    <img className="pint-icon-logo" width={200} height={200} alt="" src="images/pint.png"/>
                    <img className="tulip-icon-logo" width={200} height={200} alt="" src="images/tulip.png"/>
                    <img className="pilsner-icon-logo" width={200} height={200} alt="" src="images/pilsner.png"/>
                  </div>
                  <div className="row">
                    <h2 className="landing-page-name">Drink Up</h2>
                  </div>
                </Carousel.Item>
                <Carousel.Item className="goblet-page">
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                      <img className="goblet-icon" width={400} height={400} alt="" src="images/goblet.png"/>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <h1 className="goblet-title">The Goblet</h1>
                      <p className="goblet-detail">The majestic goblet glasses are best used for enjoying Belgian ales, German bocks, and other big sipping beers.</p>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item className="pilsner-page">
                  <div className="row">
                    <div className=" col-xs-12col-md-6">
                      <img className="pilsner-icon" width={400} height={400} alt="" src="images/pilsner.png"/>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <h1 className="pilsner-title">The Pilsner</h1>
                      <p className="pilsner-detail">As the name would suggest, the Pilsner glass is great for serving Pilsners — as well as pale lagers. Its tapered edge is meant to capture the carbonation and maintain a beer head.</p>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item className="pint-page">
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                      <img className="pint-icon" width={400} height={400} alt="" src="images/pint.png"/>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <h1 className="pint-title">The Pint</h1>
                      <p className="pint-detail">When it doubt, go with the pint.The pint glass is what you can expect to be served a beer in at a bar. Pretty much every kind of beer has ended up in one of these glasses.</p>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item className="snifter-page">
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                      <img className="snifter-icon" width={400} height={400} alt="" src="images/snifter.png"/>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <h1 className="snifter-title">The Snifter</h1>
                      <p className="snifter-detail">The snifter is typically used to serve brandy or cognac, but it’s also ideal for capturing the flavors of aromatic beers such as Imperial IPAs and Belgian ales.</p>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item className="stange-page">
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                      <img className="stange-icon" width={400} height={400} alt="" src="images/stange.png"/>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <h1 className="stange-title">The Stange</h1>
                      <p className="stange-detail">This tall, narrow glass is best used to serve Kölsch, a specialty German beer brewed in Cologne.</p>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item className="tulip-page">
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                      <img className="tulip-icon" width={400} height={400} alt="" src="images/tulip.png"/>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <h1 className="tulip-title">The Tulip</h1>
                      <p className="tulip-detail">A tulip glass is designed to trap flavors of Scottish ales, American double/imperial IPAs, and Belgian ales. It’s designed to allow for maximum head retention.</p>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item className="weizen-page">
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                      <img className="weizen-icon" width={400} height={400} alt="" src="images/weizen-03.png"/>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <h1 className="weizen-title">The Weizen</h1>
                      <p className="weizen-detail">The weizen glass is best used to serve wheat beer. It’s a German glass that’s narrow at the bottom and wider at top.</p>
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>


        <div className='container beer-info'>
          <div className='row'>
            <div className='col-xs-12 col-md-4 yeast'>
              <img className='yeast-photo' src='images/yeast-11.png' alt=''/>
              <h6 className="yeast-title">Yeast</h6>
              <p className='yeast-info'>Yeast is the magic ingredient of beer. Yeast eats at the sugars that were derived from the malt, and breaks them down into carbon dioxide and alcohol. This natural process is called fermentation and it is how all alcoholic liquor starts. Brewer’s yeasts can be divided into two main classes: ale yeast and lager yeast.</p>
            </div>
            <div className='col-xs-12 col-md-4 hops'>
              <img className='hops-photo' src='images/hops.png' alt=''/>
              <h6 className="hops-title">Hops</h6>
              <p className='hops-info'>Hops provide at least three benefits to beer; bitterness (flavor), aroma, and to a lesser extent, preservative qualities. Hops are used to impart a bitter flavor to the beer, which counteracts or balances the sweetness of the malted barley. The result is a well balanced product.</p>
            </div>
            <div className='col-xs-12 col-md-4 barley'>
              <img className='barley-photo' src='images/barley.png' alt=''/>
              <h6 className="barley-title">Barley</h6>
              <p className='barley-info'>Barley provides sugars that yeast will convert into carbon dioxide and alcohol. The standard barley used in making beer is pale malt, other types of barley are also used in the brewing process; we often refer to them as specialty grains. </p>
            </div>
          </div>
        </div>

        <div className='footer-border'>
          <div className='container users'>
            <div className="row">
              <div className="col-md-6 signin">
                <h1 className="signin-title">Sign In</h1>
                <form id="signin" className="form-signin">
                  <input id='signin-username' type='text' className='form-control signin-username' placeholder='username'/>
                  <input id='signin-password' type='password' className='form-control signin-password' placeholder='password'/>
                </form>
                <button onClick={this.handleSignIn} type='button' className='btn btn-default signin-button'>Sign In</button>
              </div>
              <div className="col-md-6 signup">
                <h1 className="signup-title">Sign Up</h1>
                <form id="signup" className="form-signup">
                  <row>
                    <input id='signup-name' type='text' className='form-control signup-name' placeholder='name'/>
                    <input id='signup-email' type='text' className='form-control signup-email' placeholder='email'/>
                    <input id='signup-username' type='text' className='form-control signup-username' placeholder='username'/>
                    <input id='signup-password' type='password' className='form-control signup-password' placeholder='password'/>
                  </row>
                </form>
                <button onClick={this.handleSignUp} type='button' className='btn btn-default submit-button'>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LandingPageBody;
