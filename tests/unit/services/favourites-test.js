import { module, test } from 'qunit';
import { setupTest } from 'art-gallery/tests/helpers';

module('Unit | Service | favourites', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:favourites');
    assert.ok(service);
  });
});
