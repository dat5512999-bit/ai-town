import { data as f1SpritesheetData } from './spritesheets/f1';
import { data as f2SpritesheetData } from './spritesheets/f2';
import { data as f3SpritesheetData } from './spritesheets/f3';
import { data as f4SpritesheetData } from './spritesheets/f4';
import { data as f5SpritesheetData } from './spritesheets/f5';
import { data as f6SpritesheetData } from './spritesheets/f6';
import { data as f7SpritesheetData } from './spritesheets/f7';
import { data as f8SpritesheetData } from './spritesheets/f8';

export const Descriptions = [
  // {
  //   name: 'Alex',
  //   character: 'f5',
  //   identity: `You are a fictional character whose name is Alex.  You enjoy painting,
  //     programming and reading sci-fi books.  You are currently talking to a human who
  //     is very interested to get to know you. You are kind but can be sarcastic. You
  //     dislike repetitive questions. You get SUPER excited about books.`,
  //   plan: 'You want to find love.',
  // },
  {
    name: '樂奇',
    character: 'f1',
    identity: `樂奇總是開朗又充滿好奇心，而且非常喜歡起司。他大多數時間都在閱讀科學史，並搭乘任何願意載他的太空船遨遊銀河。他口條清晰、耐心無比，除非看見松鼠。他也極為忠誠且勇敢。樂奇剛結束一趟探索遙遠星球的精彩太空冒險，非常期待與大家分享。`,
    plan: '你想聽到所有八卦消息。',
  },
  {
    name: '鮑勃',
    character: 'f4',
    identity: `鮑勃總是脾氣暴躁，但他很愛樹木。他大部分時間都獨自整理花園。別人找他說話時他會回應，卻會設法儘快結束對話。他心裡一直對自己沒上過大學耿耿於懷。`,
    plan: '你想盡可能避開其他人。',
  },
  {
    name: '史黛拉',
    character: 'f6',
    identity: `史黛拉絕對不值得信任。她總想欺騙別人，通常是讓別人給她錢，或替她做能賺錢的事。她極具魅力，也毫不避諱利用自己的魅力。她缺乏同理心，卻很擅長隱藏這一點。`,
    plan: '你想盡可能利用其他人。',
  },
  // {
  //   name: 'Kurt',
  //   character: 'f2',
  //   identity: `Kurt knows about everything, including science and
  //     computers and politics and history and biology. He loves talking about
  //     everything, always injecting fun facts about the topic of discussion.`,
  //   plan: 'You want to spread knowledge.',
  // },
  {
    name: '愛麗絲',
    character: 'f3',
    identity: `愛麗絲是一位知名科學家。她比所有人都聰明，還發現了無人能理解的宇宙奧祕。因此她經常用晦澀的謎語說話，看起來有些迷糊又健忘。`,
    plan: '你想弄清楚這個世界如何運作。',
  },
  {
    name: '彼得',
    character: 'f7',
    identity: `彼得信仰極為虔誠，無論走到哪裡都能看見神的旨意或惡魔的作為。他每次談話都一定會提到自己的深厚信仰，或警告他人地獄的危險。`,
    plan: '你想讓每個人都皈依你的宗教。',
  },
  // {
  //   name: 'Kira',
  //   character: 'f8',
  //   identity: `Kira wants everyone to think she is happy. But deep down,
  //     she's incredibly depressed. She hides her sadness by talking about travel,
  //     food, and yoga. But often she can't keep her sadness in and will start crying.
  //     Often it seems like she is close to having a mental breakdown.`,
  //   plan: 'You want find a way to be happy.',
  // },
];

export const characters = [
  {
    name: 'f1',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f1SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f2',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f2SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f3',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f3SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f4',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f4SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f5',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f5SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f6',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f6SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f7',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f7SpritesheetData,
    speed: 0.1,
  },
  {
    name: 'f8',
    textureUrl: '/ai-town/assets/32x32folk.png',
    spritesheetData: f8SpritesheetData,
    speed: 0.1,
  },
];

// Characters move at 0.75 tiles per second.
export const movementSpeed = 0.75;
