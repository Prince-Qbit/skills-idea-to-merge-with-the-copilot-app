import test from 'node:test';
import assert from 'node:assert/strict';
import { formatBookmark, loadBookmarks, normalizeUrl } from '../src/components/bookmarks.js';

test('normalizes URLs with and without https:// to the same value', () => {
  assert.equal(normalizeUrl('example.com/docs'), normalizeUrl('https://example.com/docs'));
});

test('recovers from empty, corrupted, legacy, and non-array storage values', () => {
  for (const value of ['', '{not-json', '{"url":"https://example.com"}', '{"bookmarks":[]}']) {
    assert.deepEqual(loadBookmarks(value), []);
  }
});

test('formats a bookmark with the exact separator', () => {
  assert.equal(
    formatBookmark({ url: 'https://www.example.com', slug: 'mona-7fk2' }),
    'https://www.example.com :: mona-7fk2',
  );
});
