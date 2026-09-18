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

  test('彼得是喜歡電動並想認真交女朋友的開朗乖乖男', () => {
    const peter = Descriptions.find(({ name }) => name === '彼得');

    expect(peter?.identity).toContain('個性開朗');
    expect(peter?.identity).toContain('打電動');
    expect(peter?.identity).toContain('女朋友');
    expect(peter?.identity).toContain('尊重女生的界線');
    expect(peter?.plan).toContain('先當朋友');
  });

  test('樂奇是為職涯發展煩惱並喜歡看電影的金牛座上班族', () => {
    const leqi = Descriptions.find(({ name }) => name === '樂奇');

    expect(leqi?.identity).toContain('金牛座');
    expect(leqi?.identity).toContain('上班');
    expect(leqi?.identity).toContain('沒有看到好的發展');
    expect(leqi?.identity).toContain('電影院看電影');
    expect(leqi?.plan).toContain('接下來可以怎麼做');
  });
});
