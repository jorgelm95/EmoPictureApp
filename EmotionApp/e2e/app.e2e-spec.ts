import { EmotionAppPage } from './app.po';

describe('emotion-app App', () => {
  let page: EmotionAppPage;

  beforeEach(() => {
    page = new EmotionAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
