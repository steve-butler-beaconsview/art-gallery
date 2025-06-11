import Component from '@glimmer/component';

export default class ImageGridComponent extends Component {
  get gridContents () {
    debugger;
    return this.args.imageUrls.reduce((acc, id, ndx, allIds) => {
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
