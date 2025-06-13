import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ImageDetailsComponent extends Component {
  @service('favourites') favouritesService;

  @action
  addFavourite () {
    this.favouritesService.add(this.args.imageId, this.args.thumbnailImageUrl, this.args.category);
    this.args.goBackToGallery();
  }
  @action
  removeFavourite () {
    this.favouritesService.remove(this.args.imageId);
    this.args.goBackToGallery();
  }
  get isFavourite () {
    return this.favouritesService.isFavourite(this.args.imageId);
  }
}
