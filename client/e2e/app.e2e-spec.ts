import { ApplausePage } from './app.po';

describe('applause App', () => {
  let page: ApplausePage;

  beforeEach(() => {
    page = new ApplausePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
