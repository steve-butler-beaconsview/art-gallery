import Controller from '@ember/controller';

export default class GalleryController extends Controller {
  queryParams = ['page'];

  page = 1;
}
