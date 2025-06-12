import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class FavouritesService extends Service {
  @tracked _favs = {};
  add (imageId) {
    this._favs[imageId] = true;
  }
  remove (imageId) {
    delete this._favs[imageId];
  }
  isFavourite (imageId) {
    return !!this._favs[imageId];
  }
}
