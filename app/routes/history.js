import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class HistoryRoute extends Route {
  @service('view-tracker') viewTrackerService;

  model () {
    const {
      goBackToGallery,
    } = this.controllerFor('gallery').get('model')?.selectedImageInfo || {};
    return {
      goBackToGallery,
      allViewed: this.viewTrackerService.getAllViewed(),
    };
  }
}
