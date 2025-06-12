import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ImageTileComponent extends Component {
  @service('favourites') favouritesService;

  get isFavourite () {
    return this.favouritesService.isFavourite(this.args.imageId);
  }
}

