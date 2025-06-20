import Route from '@ember/routing/route';
import axios from 'axios';
import { service } from '@ember/service';

export default class GalleryRoute extends Route {
  @service router;

  queryParams = {
    page: { refreshModel: true },
  };
  buildPageUrlFromPageNumber (pageNumber, gridDimensions) {
    const maxRetrievalSize = gridDimensions.columns * gridDimensions.rows;
    const currentPageUrl = `https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=${maxRetrievalSize}&fields=id,image_id`;
    return currentPageUrl;
  }

  async retrieveNewPage (pageNumber, pageUrl) {
    const pageResponse = await axios.get(pageUrl);
    const {
      total_pages: totalPageCount,
      next_url: nextPageUrl,
      prev_url: prevPageUrl,
    } = pageResponse.data.pagination;
    const paginationData = {
      currentPageNumber: pageNumber,
      totalPageCount,
      nextPageUrl,
      prevPageUrl,
    };
    const { data: { data } } = pageResponse;

    const goBackToGallery = () => {
      this.router.transitionTo('gallery', { queryParams: { page: pageNumber } });
    };
    const model = {
      selectedImageInfo: {
        imageId: undefined,
        imageInfoUrl: '',
        largeImageUrl: '',
        goBackToGallery,
      },
    };
    const goToImageInfoPage = (id, imageInfoUrl, largeImageUrl) => {
      Object.assign(model.selectedImageInfo, {
        imageId: id,
        imageInfoUrl,
        largeImageUrl,
      });
      this.router.transitionTo('artwork', { queryParams: { id } });
    };
    const imagesInfo = data.map(({ id, image_id }) => ({
      id,
      goToImageInfoPage: () => goToImageInfoPage(
        id,
        `https://api.artic.edu/api/v1/artworks/${id}`,
        `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`
      ),
      imageUrl: `https://www.artic.edu/iiif/2/${image_id}/full/200,/0/default.jpg`,
    }));
    model.paginationData = paginationData;
    model.imagesInfo = imagesInfo;
    return model;
  }
  async model ({ page: currentPageNumber = 1 }) {
    const gridDimensions = {
      rows: 5,
      columns: 5,
    }
    let pageInfo;
    try {
      pageInfo = await this.retrieveNewPage(
        currentPageNumber,
        this.buildPageUrlFromPageNumber(currentPageNumber, gridDimensions)
      );
    } catch (e) {
      return {
        error: true,
      }
    }

    const {
      paginationData,
      imagesInfo,
      selectedImageInfo,
    } = pageInfo;
    const goToIndexPage = page => {
      this.router.transitionTo('gallery', { queryParams: { page } });
    }

    const goToFavourites = () => {
      this.router.transitionTo('favourites');
    }
    return {
      gridDimensions,
      paginationData,
      imagesInfo,
      selectedImageInfo,
      goToPrevPage: currentPageNumber > 1 ? () => goToIndexPage(currentPageNumber - 1) : undefined,
      goToNextPage: currentPageNumber < paginationData.totalPageCount ? () => goToIndexPage(currentPageNumber + 1) : undefined,
      goToFavourites,
    }
  }
}
