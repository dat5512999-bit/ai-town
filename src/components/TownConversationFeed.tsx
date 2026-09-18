import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { GameId } from '../../convex/aiTown/ids';
import { SelectElement } from './Player';
import { conversationTitle } from './conversationFeedUtils';

export default function TownConversationFeed({
  worldId,
  availablePlayerIds,
  setSelectedElement,
}: {
  worldId: Id<'worlds'>;
  availablePlayerIds: Set<GameId<'players'>>;
  setSelectedElement: SelectElement;
}) {
  const messages = useQuery(api.messages.listRecentTownMessages, { worldId });

  const openResident = (author: GameId<'players'>, participantIds: GameId<'players'>[]) => {
    const playerId = [author, ...participantIds].find((id) => availablePlayerIds.has(id));
    if (playerId) {
      setSelectedElement({ kind: 'player', id: playerId });
    }
  };

  return (
    <section aria-label="全鎮對話" className="flex min-h-0 flex-1 flex-col">
      <div className="box shrink-0">
        <div className="bg-brown-700 p-2 text-center">
          <h2 className="font-display text-2xl tracking-wider shadow-solid sm:text-4xl">全鎮對話</h2>
          <p className="mt-1 font-system text-xs text-brown-200">旁觀模式・不必加入聊天</p>
        </div>
      </div>

      {messages === undefined && <p className="mt-6 text-center">正在讀取居民對話……</p>}
      {messages?.length === 0 && (
        <div className="mt-6 rounded bg-brown-700 p-4 text-center font-system text-sm">
          居民目前還沒有聊天。保持遊戲開啟一會兒，新的對話會自動出現在這裡。
        </div>
      )}
      {messages && messages.length > 0 && (
        <div className="mt-4 space-y-3 font-system" aria-live="polite">
          {messages.map((message) => (
            <button
              type="button"
              key={message._id}
              className="w-full rounded border-2 border-brown-500 bg-brown-200 p-3 text-left text-brown-900 transition hover:border-brown-300 hover:bg-white"
              onClick={() =>
                openResident(
                  message.author as GameId<'players'>,
                  message.participantIds as GameId<'players'>[],
                )
              }
              title="點一下查看這位居民"
            >
              <div className="flex items-start justify-between gap-2 text-xs">
                <strong className="text-clay-700">
                  {conversationTitle(message.authorName, message.participantNames)}
                </strong>
                {message.isActive && (
                  <span className="shrink-0 rounded bg-clay-700 px-2 py-0.5 text-white">聊天中</span>
                )}
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
              <time className="mt-2 block text-right text-[11px] text-brown-700">
                {new Date(message._creationTime).toLocaleTimeString('zh-TW', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
