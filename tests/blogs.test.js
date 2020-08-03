const CustomPage = require('./helpers/page');

let page;

beforeEach( async () => {
    page = await CustomPage.build();
    await page.goto('localhost:3000')
});

afterEach( async () => {
    await page.close();
})



describe('When logged in', () => {
    beforeEach( async () => {
        await page.login();
        await page.click('a.btn-floating');
    });

    test('can see blog create form', async () => {
        const label = await page.getContentsOf('form label');
        expect(label).toEqual('Blog Title')
    });

    describe('And using valid inputs', () => {
        beforeEach( async () => {
            await page.type('.title input', "My Test Title");
            await page.type('.content input', "My Test Content");
            await page.click('form button');
        });
    
        test('Submitting takes user to a review screen', async () => {
            const text = await page.getContentsOf('h5');
            expect(text).toEqual('Please confirm your entries');
        });
    
        test('Submitting then saving adds blog to index page', async () => {
            await page.click('button.green');
            await page.waitFor('.card');

            const title = await page.getContentsOf('.card-title');
            const content = await page.getContentsOf('p');

            expect(title).toEqual('My Test Title');
            expect(content).toEqual('My Test Content');

        });
    });

    // describe('And using invalid inputs', () => {
    //     beforeEach( async () => {
    //         await page.click('form button'); 
    //     });
    //     test('the form shows an error message', async () => {
    //         const title = await page.getContentsOf('.title .red-text');
    //         expect(title).toMatch('You must provide a value');
    //         const content = await page.getContentsOf('.content .red-text')
    //         expect(content).toMatch('You must provide a value');
            
    //     });
    // });
});

