import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './utils.ts';

describe('slugify', () => {
  it('handles standard text strings', () => {
    assert.strictEqual(slugify('Hello World'), 'hello-world');
    assert.strictEqual(slugify('Developer Tools'), 'developer-tools');
  });

  it('handles null, undefined, empty, and non-string inputs', () => {
    assert.strictEqual(slugify(''), '');
    assert.strictEqual(slugify(null), '');
    assert.strictEqual(slugify(undefined), '');
    assert.strictEqual(slugify(123 as unknown as string), '');
    assert.strictEqual(slugify({} as unknown as string), '');
  });

  it('handles whitespace-only and hyphen-only strings', () => {
    assert.strictEqual(slugify('   '), '');
    assert.strictEqual(slugify('---'), '');
    assert.strictEqual(slugify('   ---   '), '');
  });

  it('trims leading, trailing, and consecutive hyphens and spaces', () => {
    assert.strictEqual(slugify('  --- Hello    World --- '), 'hello-world');
    assert.strictEqual(slugify('foo---bar--baz'), 'foo-bar-baz');
  });

  it('removes parenthetical, bracketed, colon, and slash content', () => {
    assert.strictEqual(slugify('📦 PACKS (Colección de recursos...)'), 'packs');
    assert.strictEqual(slugify('Self-Hosted / Autoalojado'), 'self-hosted');
    assert.strictEqual(slugify('Category: Tools'), 'category');
    assert.strictEqual(slugify('Frameworks [Frontend]'), 'frameworks');
  });

  it('strips emojis and special non-alphanumeric characters', () => {
    assert.strictEqual(slugify('🚀 Quick Start!'), 'quick-start');
    assert.strictEqual(slugify('Cool & Fun @ Web'), 'cool-fun-web');
    assert.strictEqual(slugify('📦 !!! (test)'), '');
  });

  it('normalizes accents and diacritics', () => {
    assert.strictEqual(slugify('Colección de Guías e Imágenes'), 'coleccion-de-guias-e-imagenes');
    assert.strictEqual(slugify('ÁÉÍÓÚ áéíóú ñ Ñ'), 'aeiou-aeiou-n-n');
  });
});
