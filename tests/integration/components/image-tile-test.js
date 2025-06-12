import { module, test } from 'qunit';
import { setupRenderingTest } from 'art-gallery/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | image-tile', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ImageTile />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <ImageTile>
        template block text
      </ImageTile>
    `);

    assert.dom().hasText('template block text');
  });
});
