import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class FavouritesRoute extends Route {
  @service router;
  @service('favourites') favouritesService;

  model () {
    const {
      goBackToGallery,
    } = this.controllerFor('gallery').get('model')?.selectedImageInfo || {};
    const allIds = this.favouritesService.getAllIds();
    const categories = allIds
      .map(imageId => ({
        ...(this.favouritesService.getFavouriteInfo(imageId) || {}),
        imageId,
      }))
      .reduce((acc, { imageId, thumbnailImageUrl, category }) => {
        const removeFromFavourites = () => {
          this.favouritesService.remove(imageId);
          this.router.refresh();
        }
        return {
          ...acc,
          [category]: [
            ...(acc[category] || []),
            { imageId, thumbnailImageUrl, removeFromFavourites },
          ],
        };
      }, {});
    return {
      totalCount: allIds.length,
      categories,
      goBackToGallery,
    }
  }
}
