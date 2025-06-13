import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class FavouritesRoute extends Route {
  @service('favourites') favouritesService;

  model () {
    const allIds = this.favouritesService.getAllIds();
    const categories = allIds
      .map(imageId => ({
        ...(this.favouritesService.getFavouriteInfo(imageId) || {}),
        imageId,
      }))
      .reduce((acc, { imageId, thumbnailImageUrl, category }) => ({
        ...acc,
        [category]: [
          ...(acc[category] || []),
          { imageId, thumbnailImageUrl },
        ],
      }), {});
    return {
      totalCount: allIds.length,
      categories,
    }
  }
}
