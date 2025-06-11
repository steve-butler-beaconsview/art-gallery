import { module, test } from 'qunit';
import { setupRenderingTest } from 'art-gallery/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | image-grid', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ImageGrid />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <ImageGrid>
        template block text
      </ImageGrid>
    `);

    assert.dom().hasText('template block text');
  });
});
