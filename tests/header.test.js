const CustomPage = require('./helpers/page')

let page;

beforeEach( async () => {
    page = await CustomPage.build();
    await page.goto('localhost:3000');
});

afterEach( async () => {
    await page.close();
})

test('the header has the correct text', async () => {
    const text = await page.getContentsOf('a.brand-logo')
    expect(text).toEqual('Blogster');
});

test('clicking login starts the oath flow', async () => {
    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows logout button', async () => {
    await page.login()
    const text = await page.getContentsOf('a[href="/api/logout"]')
    expect(text).toEqual('Logout')
})