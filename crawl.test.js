const { normalizeURL } = require('./crawl')
const { test, expect } = require('@jest/globals')

test('normalizeURL', () => {
    const input = 'https://facebook.com/path'
    const actual = normalizeURL(input)
    const expected = 'facebook.com/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL slash end', () => {
    const input = 'https://facebook.com/path/'
    const actual = normalizeURL(input)
    const expected = 'facebook.com/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL CAPITAL', () => {
    const input = 'https://FACEBOOK.com/path/'
    const actual = normalizeURL(input)
    const expected = 'facebook.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL trp http', () => {
    const input = 'http://facebook.com/path/'
    const actual = normalizeURL(input)
    const expected = 'facebook.com/path'
    expect(actual).toEqual(expected)
})
