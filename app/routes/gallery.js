import Route from '@ember/routing/route';
import axios from 'axios';

export default class GalleryRoute extends Route {
  async model () {
    try {
      const gridColumns = 5;
      const gridRows = 5;
      const maxRetrievalSize = gridColumns * gridRows;
      const { data: { data } } = await axios.get(`https://api.artic.edu/api/v1/artworks?page=1&limit=${maxRetrievalSize}&fields=id,image_id,width,height`);
      const imageUrls = data.map(({ image_id }) => image_id).map(id => `https://www.artic.edu/iiif/2/${id}/full/200,/0/default.jpg`)
      const modelData = {
        gridRows,
        gridColumns,
        imageUrls,
      }
      return modelData;
    } catch (e) {
      console.error(e);
    }
  }
}
