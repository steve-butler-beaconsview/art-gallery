import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ViewTrackerService extends Service {
  @tracked _viewed = {};
  add (imageId, thumbnailImageUrl) {
    this._viewed[imageId] = thumbnailImageUrl;
  }
  wasViewed (imageId) {
    return !!this._viewed[imageId];
  }
  getAllViewed () {
    return Object.entries(this._viewed).map(([imageId, thumbnailImageUrl]) => ({
      imageId,
      thumbnailImageUrl,
    }));
  }
}

