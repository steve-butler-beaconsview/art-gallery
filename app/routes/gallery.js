import Route from '@ember/routing/route';
import axios from 'axios';

export default class GalleryRoute extends Route {
  async model () {
    try {
      const matrixColumns = 5;
      const matrixRows = 5;
      const maxRetrievalSize = matrixColumns * matrixRows;
      const { data: { data } } = await axios.get(`https://api.artic.edu/api/v1/artworks?page=1&limit=${maxRetrievalSize}&fields=id,image_id,width,height`);
      const modelData = data.map(({ image_id }) => image_id).reduce((acc, id, ndx, allIds) => {
        if (ndx % matrixColumns === 0) {
          return [
            ...acc,
            allIds.slice(ndx, ndx + matrixColumns)
          ];
        }
        return acc;
      }, []);
      debugger;
      return modelData;
    } catch (e) {
      console.error(e);
    }
  }
}
