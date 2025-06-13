import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ImageTileComponent extends Component {
  @service('favourites') favouritesService;
  @service('view-tracker') viewTrackerService;

  get isFavourite () {
    return this.favouritesService.isFavourite(this.args.imageId);
  }
  get wasViewed () {
    return this.viewTrackerService.wasViewed(this.args.imageId);
  }
}

