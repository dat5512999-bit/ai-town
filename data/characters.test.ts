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

  test('包含小斌與小加的指定角色設定', () => {
    const xiaobin = Descriptions.find(({ name }) => name === '小斌');
    const xiaojia = Descriptions.find(({ name }) => name === '小加');

    expect(xiaobin?.identity).toContain('處女座');
    expect(xiaobin?.identity).toContain('男生');
    expect(xiaojia?.identity).toContain('憂鬱症');
    expect(xiaojia?.identity).toContain('女生');
    expect(xiaojia?.identity).toContain('憂鬱症不是她的全部');
  });
});
