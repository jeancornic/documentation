import {
  paintColorsFrontmatter,
  paintColorsPrefOptionsConfig
} from '../../config/mocks/valid/paintColorsConfig';
import { describe, test, expect } from 'vitest';
import { ConfigProcessor } from '../../../src/helperModules/ConfigProcessor';
import { SharedRenderer } from '../../../src/helperModules/SharedRenderer';
import { ResolvedPagePrefsSchema } from '../../../src/schemas/resolvedPagePrefs';

describe('SharedRenderer.resolvePagePrefs', () => {
  test('resolves to the correct values for the default selections', () => {
    const valsByPrefId = ConfigProcessor.getDefaultValuesByPrefId(
      paintColorsFrontmatter,
      paintColorsPrefOptionsConfig
    );

    const resolvedPagePrefs = SharedRenderer.resolvePagePrefs({
      pagePrefsConfig: paintColorsFrontmatter.page_preferences!,
      prefOptionsConfig: paintColorsPrefOptionsConfig,
      valsByPrefId
    });
    ResolvedPagePrefsSchema.parse(resolvedPagePrefs);

    expect(resolvedPagePrefs.color.currentValue).toEqual('blue');
    expect(resolvedPagePrefs.finish.currentValue).toEqual('eggshell');
    expect(resolvedPagePrefs.paint.currentValue).toEqual('elegant_royal');
    expect(resolvedPagePrefs.paint.options.map((o) => o.id)).toEqual([
      'elegant_royal',
      'robins_egg'
    ]);
  });

  test('resolves to the correct values when selections are changed', () => {
    const valsByPrefId = ConfigProcessor.getDefaultValuesByPrefId(
      paintColorsFrontmatter,
      paintColorsPrefOptionsConfig
    );

    valsByPrefId.color = 'red';
    valsByPrefId.finish = 'gloss';

    const resolvedPagePrefs = SharedRenderer.resolvePagePrefs({
      pagePrefsConfig: paintColorsFrontmatter.page_preferences!,
      prefOptionsConfig: paintColorsPrefOptionsConfig,
      valsByPrefId
    });
    ResolvedPagePrefsSchema.parse(resolvedPagePrefs);

    expect(resolvedPagePrefs.color.currentValue).toEqual('red');
    expect(resolvedPagePrefs.finish.currentValue).toEqual('gloss');
    expect(resolvedPagePrefs.paint.currentValue).toEqual('fire_engine');
    expect(resolvedPagePrefs.paint.options.map((o) => o.id)).toEqual([
      'fire_engine',
      'crimson'
    ]);
  });
});
