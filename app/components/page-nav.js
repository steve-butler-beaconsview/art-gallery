import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import { on } from '@ember/modifier'

export default class PageNavComponent extends Component {
  constructor () {
    super(...arguments);
    getOwner(this).register('modifier:on', on);
  }
}

