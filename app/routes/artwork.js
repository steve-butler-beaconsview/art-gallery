import Route from '@ember/routing/route';
import axios from 'axios';

export default class ArtworkRoute extends Route {
  async model () {
    const {
      imageId,
      imageInfoUrl,
      thumbnailImageUrl,
      largeImageUrl: imageUrl,
      goBackToGallery,
    } = this.controllerFor('gallery').get('model')?.selectedImageInfo || {};
    if (!imageInfoUrl) {
      return { error: true };
    }
    let imageInfoResponse;
    try {
      imageInfoResponse = await axios.get(imageInfoUrl);
    } catch (e) {
      return { error: true };
    }
    const {
      title,
      artist_title: artist,
      date_display: date,
      description,
      category_titles: categories,
    } = imageInfoResponse.data.data;
    const model = {
      title,
      artist,
      date,
      description: description || 'No description provided.',
      thumbnailImageUrl,
      imageUrl,
      imageId,
      category: categories[0],
      goBackToGallery,
    };
    return model;
  }
}
