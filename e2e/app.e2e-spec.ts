import { MpPlayoutGuiPage } from './app.po';

describe('mp-playout-gui App', () => {
  let page: MpPlayoutGuiPage;

  beforeEach(() => {
    page = new MpPlayoutGuiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
