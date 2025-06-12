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
    const currentPageUrl = `https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=${maxRetrievalSize}&fields=id,image_id,width,height`;
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
    const imageUrls = data.map(({ image_id }) => image_id)
      .map(id => `https://www.artic.edu/iiif/2/${id}/full/200,/0/default.jpg`);
    return {
      paginationData,
      imageUrls,
    };
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
      imageUrls,
    } = pageInfo;
    const goToIndexPage = page => {
      debugger;
      this.router.transitionTo('gallery', { queryParams: { page } });
    }

    return {
      gridDimensions,
      paginationData,
      imageUrls,
      goToPrevPage: currentPageNumber > 1 ? () => goToIndexPage(currentPageNumber - 1) : undefined,
      goToNextPage: currentPageNumber < paginationData.totalPageCount ? () => goToIndexPage(currentPageNumber + 1) : undefined,
    }
  }
}
