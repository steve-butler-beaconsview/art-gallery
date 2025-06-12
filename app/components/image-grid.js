import Component from '@glimmer/component';

export default class ImageGridComponent extends Component {
  get gridContents () {
    if (!this.args.imagesInfo) {
      return [[]];
    }
    return this.args.imagesInfo
      .reduce((acc, id, ndx, allIds) => {
        const rowNdx = ndx % this.args.columns;
        if (rowNdx === 0 && rowNdx < this.args.rows) {
          return [
            ...acc,
            allIds.slice(ndx, ndx + this.args.columns)
          ];
        }
        return acc;
      }, []);
  }
}
