import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ViewTrackerService extends Service {
  @tracked _viewed = {};
  add (imageId) {
    this._viewed[imageId] = true;
  }
  wasViewed (imageId) {
    return !!this._viewed[imageId];
  }
  getAllIds () {
    return Object.keys(this._viewed);
  }
}

