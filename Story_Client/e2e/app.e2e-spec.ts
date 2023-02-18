import { StoryDBPage } from './app.po';

describe('Stories App', () => {
  let page: StoryDBPage;

  beforeEach(() => {
    page = new StoryDBPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
