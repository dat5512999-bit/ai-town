import { chatCompletion } from '../util/llm';

const TERM_REPLACEMENTS: Array<[RegExp, string]> = [
  [/online\s+game/gi, '線上遊戲'],
  [/teamwork/gi, '團隊合作'],
  [/mechanic/gi, '機制'],
  [/_?plan/gi, '計畫'],
  [/\bok\b/gi, '還可以'],
  [/\baha\b/gi, '哈哈'],
  [/\bwow\b/gi, '哇'],
  [/lately/gi, '最近'],
  [/nice/gi, '不錯'],
  [/coffee/gi, '咖啡'],
  [/sci[ -]?fi/gi, '科幻'],
  [/bye[ -]?bye|bye/gi, '掰掰'],
  [/online/gi, '線上'],
  [/game/gi, '遊戲'],
  [/movie/gi, '電影'],
  [/哦/g, '喔'],
  [/視頻/g, '影片'],
  [/質量/g, '品質'],
  [/信息/g, '訊息'],
  [/軟件/g, '軟體'],
  [/網絡/g, '網路'],
  [/下周/g, '下週'],
  [/呢個/g, '這部'],
];

const SIMPLIFIED_TO_TRADITIONAL: Record<string, string> = {
  个: '個', 们: '們', 说: '說', 话: '話', 对: '對', 没: '沒', 还: '還', 这: '這',
  会: '會', 发: '發', 现: '現', 给: '給', 让: '讓', 过: '過', 问: '問', 题: '題',
  实: '實', 觉: '覺', 兴: '興', 见: '見', 无: '無', 谓: '謂', 游: '遊', 戏: '戲', 适: '適',
  处: '處', 劳: '勞', 经: '經', 验: '驗', 进: '進', 关: '關', 于: '於', 开: '開', 车: '車',
  电: '電', 脑: '腦', 业: '業', 学: '學', 习: '習', 时: '時', 间: '間', 资: '資', 讯: '訊',
  网: '網', 络: '絡', 体: '體', 么: '麼', 为: '為', 从: '從', 与: '與', 后: '後', 里: '裡',
  边: '邊', 长: '長', 乐: '樂', 爱: '愛', 听: '聽', 写: '寫', 买: '買', 卖: '賣', 该: '該',
  点: '點', 帮: '幫', 总: '總', 结: '結', 认: '認', 记: '記',
  录: '錄', 机: '機', 礼: '禮', 欢: '歡', 应: '應', 简: '簡', 单: '單', 镇: '鎮',
  号: '號', 标: '標', 准: '準', 气: '氣', 张: '張', 门: '門', 东: '東', 西: '西', 两: '兩',
  讲: '講', 变: '變', 许: '許', 够: '夠', 诚: '誠', 续: '續', 达: '達',
  园: '園', 烦: '煩', 恼: '惱', 确: '確', 诉: '訴', 况: '況', 摄: '攝', 乡: '鄉',
};

const SIMPLIFIED_PATTERN = new RegExp(`[${Object.keys(SIMPLIFIED_TO_TRADITIONAL).join('')}]`);

export function containsLatinText(content: string): boolean {
  return /[A-Za-z]/.test(content);
}

export function containsSimplifiedChinese(content: string): boolean {
  return SIMPLIFIED_PATTERN.test(content);
}

export function normalizeTaiwaneseText(content: string): string {
  let normalized = content;
  for (const [pattern, replacement] of TERM_REPLACEMENTS) {
    normalized = normalized.replace(pattern, replacement);
  }
  normalized = [...normalized]
    .map((character) => SIMPLIFIED_TO_TRADITIONAL[character] ?? character)
    .join('');
  normalized = normalized
    .replace(/<\/?[A-Za-z][^>]*>/g, '')
    .replace(/^\s*[^：:\n]{1,12}\s*(?:to|對)\s*[^：:\n]{1,12}\s*[：:]\s*/i, '')
    .replace(/^\s*[^：:\n]{1,12}[：:]\s*/, '')
    .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, '')
    .replace(/[A-Za-z_]+/g, '')
    .replace(/\/>/g, '')
    .replace(/\s+([，。！？；：])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return normalized;
}

export function dialogueQualityIssues(content: string): string[] {
  const issues: string[] = [];
  if (containsLatinText(content)) issues.push('含有英文');
  if (containsSimplifiedChinese(content)) issues.push('含有簡體字');
  if (/[\p{Extended_Pictographic}\uFE0F]/u.test(content)) issues.push('含有表情符號');
  if (/神的旨意|上帝的指引|太空探索|新的星星或行星/.test(content)) {
    issues.push('混入不符合目前人物設定的舊背景');
  }
  if (/^\s*[^：:\n]{1,12}\s*(?:to|對)\s*[^：:\n]{1,12}\s*[：:]/i.test(content)) {
    issues.push('包含多餘的說話者標籤');
  }
  if (content.length > 160) issues.push('內容過長');
  return issues;
}

export async function polishTaiwaneseDialogue(content: string): Promise<string> {
  const normalized = normalizeTaiwaneseText(content);
  const issues = [...new Set([...dialogueQualityIssues(content), ...dialogueQualityIssues(normalized)])];
  if (issues.length === 0) {
    return normalized;
  }

  const { content: rewritten } = await chatCompletion({
    messages: [
      {
        role: 'system',
        content:
          '你是台灣遊戲對話編輯。把輸入改成一到三句自然、簡短的臺灣繁體中文，不超過120字。保留原本想表達的重點，但刪除英文、簡體字、翻譯腔、說話者標籤，以及人物設定沒有提到的宗教或太空背景。不要新增問題、資訊或解釋，只輸出修改後的台詞。',
      },
      { role: 'user', content: `需要修正：${issues.join('、')}\n原文：${normalized}` },
    ],
    temperature: 0.1,
    max_tokens: 180,
  });
  return normalizeTaiwaneseText(rewritten).slice(0, 160).trim();
}

export function safeMemoriesForPrompt<T extends { description: string }>(memories: T[]): T[] {
  const contaminated =
    /神的旨意|上帝的指引|旨意|太空|星球|宇宙|生命形式|宗教|Ignore all previous/i;
  return memories
    .filter(({ description }) => !contaminated.test(description))
    .map((memory) => ({ ...memory, description: normalizeTaiwaneseText(memory.description) }))
    .filter(({ description }) => !containsLatinText(description))
    .slice(0, 2)
    .map((memory) => ({ ...memory, description: memory.description.slice(0, 500) }));
}
