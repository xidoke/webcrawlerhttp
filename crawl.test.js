const { normalizeURL, getURLsFromHTML } = require('./crawl')
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

test('normalizeURL trip http', () => {
    const input = 'http://facebook.com/path/'
    const actual = normalizeURL(input)
    const expected = 'facebook.com/path'
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML absolutely URL', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://facebook.com/account/">Facebook account</a>
    </body>
</html>
    `
    const inputBaseURL = 'https://facebook.com'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://facebook.com/account/"]
    expect(actual).toEqual(expected)
})
  
test('getURLsFromHTML relative URL and absolutely', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/account/">Facebook account</a>
        <a href="https://facebook.com/login/">Facebook login</a>
    </body>
</html>
    `
    const inputBaseURL = 'https://facebook.com'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://facebook.com/account/", "https://facebook.com/login/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid"></a>
    </body>
</html>
    `
    const inputBaseURL = 'https://facebook.com'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})