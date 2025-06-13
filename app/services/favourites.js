import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class FavouritesService extends Service {
  @tracked _favs = {};
  add (imageId, thumbnailImageUrl, category) {
    this._favs[imageId] = {
      thumbnailImageUrl,
      category,
    };
  }
  remove (imageId) {
    delete this._favs[imageId];
  }
  isFavourite (imageId) {
    return !!this._favs[imageId];
  }
  getAllIds () {
    return Object.keys(this._favs);
  }
  getFavouriteInfo (imageId) {
    return this._favs[imageId];
  }
}
