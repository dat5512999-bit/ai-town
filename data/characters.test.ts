import { Descriptions } from './characters';

describe('Traditional Chinese character data', () => {
  test('all active characters have localized names, identities, and goals', () => {
    expect(Descriptions).toHaveLength(5);
    for (const character of Descriptions) {
      expect(character.name).toMatch(/[\u3400-\u9fff]/);
      expect(character.identity).toMatch(/[\u3400-\u9fff]/);
      expect(character.plan).toMatch(/[\u3400-\u9fff]/);
    }
  });
});
