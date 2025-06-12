import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class FavouritesRoute extends Route {
  @service('favourites') favouritesService;

  model () {
    return this.favouritesService.getAllIds();
  }
}
