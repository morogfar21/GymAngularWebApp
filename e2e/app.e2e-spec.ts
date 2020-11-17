import { Webassignment2Page } from './app.po';

describe('webassignment2 App', function() {
  let page: Webassignment2Page;

  beforeEach(() => {
    page = new Webassignment2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
