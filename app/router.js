import EmberRouter from '@ember/routing/router';
import config from 'art-gallery/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('gallery');
  this.route('artwork');
  this.route('favourites');
  this.route('history');
});
