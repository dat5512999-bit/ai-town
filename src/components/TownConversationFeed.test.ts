import { conversationTitle } from './conversationFeedUtils';

describe('conversationTitle', () => {
  test('shows who is speaking to whom', () => {
    expect(conversationTitle('小斌', ['小斌', '小加'])).toBe('小斌 對 小加 說');
  });

  test('falls back to the author when participants are unavailable', () => {
    expect(conversationTitle('彼得', [])).toBe('彼得');
  });
});
