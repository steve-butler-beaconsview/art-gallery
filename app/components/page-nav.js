import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import { on } from '@ember/modifier'

export default class PageNavComponent extends Component {
  constructor () {
    super(...arguments);
    const owner = getOwner(this);
    owner.unregister('modifier:on');
    owner.register('modifier:on', on);
  }
}
