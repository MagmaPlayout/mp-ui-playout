import { Ng2WebcamStreamingPage } from './app.po';

describe('ng2-webcam-streaming App', function() {
  let page: Ng2WebcamStreamingPage;

  beforeEach(() => {
    page = new Ng2WebcamStreamingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
