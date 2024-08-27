import {
  paintColorsFrontmatter,
  paintColorsPrefOptionsConfig
} from '../../mocks/valid/paintColorsConfig';
import { describe, test, expect } from 'vitest';
import { YamlProcessor } from '../../../src/helperModules/YamlProcessor';
import {
  resolvePagePrefs,
  resolveMinifiedPagePrefs
} from '../../../src/helperModules/prefsResolution';
import { ResolvedPagePrefsSchema } from '../../../src/schemas/resolvedPagePrefs';

describe('SharedRenderer.resolvePagePrefs', () => {
  test('resolves to the correct values for the default selections', () => {
    const valsByPrefId = YamlProcessor.getDefaultValuesByPrefId(
      paintColorsFrontmatter,
      paintColorsPrefOptionsConfig
    );

    const resolvedPagePrefs = resolvePagePrefs({
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
    const valsByPrefId = YamlProcessor.getDefaultValuesByPrefId(
      paintColorsFrontmatter,
      paintColorsPrefOptionsConfig
    );

    valsByPrefId.color = 'red';
    valsByPrefId.finish = 'gloss';

    const resolvedPagePrefs = resolvePagePrefs({
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

  test('resolves to the correct values using minified page prefs', () => {
    const valsByPrefId = YamlProcessor.getDefaultValuesByPrefId(
      paintColorsFrontmatter,
      paintColorsPrefOptionsConfig
    );

    const minifiedPagePrefs = YamlProcessor.minifyPagePrefsConfig(
      paintColorsFrontmatter.page_preferences!
    );

    const minifiedPrefOptionsConfig = YamlProcessor.minifyPrefOptionsConfig(
      paintColorsPrefOptionsConfig
    );

    const resolvedPagePrefs = resolveMinifiedPagePrefs({
      pagePrefsConfig: minifiedPagePrefs,
      prefOptionsConfig: minifiedPrefOptionsConfig,
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
});
