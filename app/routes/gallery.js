import Route from '@ember/routing/route';
import axios from 'axios';

export default class GalleryRoute extends Route {
  async model () {
    try {
      const gridColumns = 5;
      const gridRows = 5;
      const currentPageNumber = 1;
      const maxRetrievalSize = gridColumns * gridRows;
      const pageResponse = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${currentPageNumber}&limit=${maxRetrievalSize}&fields=id,image_id,width,height`);
      const { data: { data } } = pageResponse;
      const {
        total_pages: totalPageCount,
        next_url: nextPageUrl,
        prev_url: prevPageUrl,
      } = pageResponse.data.pagination;
      const imageUrls = data.map(({ image_id }) => image_id).map(id => `https://www.artic.edu/iiif/2/${id}/full/200,/0/default.jpg`)
      const modelData = {
        gridRows,
        gridColumns,
        currentPageNumber,
        totalPageCount,
        nextPageAvailable: !!nextPageUrl,
        prevPageAvailable: !!prevPageUrl,
        imageUrls,
      }
      return modelData;
    } catch (e) {
      console.error(e);
    }
  }
}
