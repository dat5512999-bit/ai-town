export function conversationTitle(authorName: string, participantNames: string[]) {
  const others = participantNames.filter((name) => name !== authorName);
  return others.length > 0 ? `${authorName} 對 ${others.join('、')} 說` : authorName;
}
