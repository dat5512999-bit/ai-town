import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { insertInput } from './aiTown/insertInput';
import { conversationId, playerId } from './aiTown/ids';

export const listMessages = query({
  args: {
    worldId: v.id('worlds'),
    conversationId,
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query('messages')
      .withIndex('conversationId', (q) => q.eq('worldId', args.worldId).eq('conversationId', args.conversationId))
      .collect();
    const out = [];
    for (const message of messages) {
      const playerDescription = await ctx.db
        .query('playerDescriptions')
        .withIndex('worldId', (q) => q.eq('worldId', args.worldId).eq('playerId', message.author))
        .first();
      if (!playerDescription) {
        throw new Error(`Invalid author ID: ${message.author}`);
      }
      out.push({ ...message, authorName: playerDescription.name });
    }
    return out;
  },
});

// Observer mode uses a single bounded query instead of opening every conversation separately.
export const listRecentTownMessages = query({
  args: {
    worldId: v.id('worlds'),
  },
  handler: async (ctx, args) => {
    const [world, descriptions, archivedConversations, messages] = await Promise.all([
      ctx.db.get(args.worldId),
      ctx.db
        .query('playerDescriptions')
        .withIndex('worldId', (q) => q.eq('worldId', args.worldId))
        .collect(),
      ctx.db
        .query('archivedConversations')
        .withIndex('worldId', (q) => q.eq('worldId', args.worldId))
        .order('desc')
        .take(30),
      ctx.db
        .query('messages')
        .withIndex('worldId', (q) => q.eq('worldId', args.worldId))
        .order('desc')
        .take(50),
    ]);

    if (!world) {
      return [];
    }

    const names = new Map(descriptions.map((description) => [description.playerId, description.name]));
    const activeConversations = new Map(
      world.conversations.map((conversation) => [
        conversation.id,
        conversation.participants.map((participant) => participant.playerId),
      ]),
    );
    const archived = new Map(
      archivedConversations.map((conversation) => [conversation.id, conversation.participants]),
    );

    return messages.map((message) => {
      const participants =
        activeConversations.get(message.conversationId) ?? archived.get(message.conversationId) ?? [];
      return {
        ...message,
        authorName: names.get(message.author) ?? '未知居民',
        participantIds: participants,
        participantNames: participants.map((playerId) => names.get(playerId) ?? '未知居民'),
        isActive: activeConversations.has(message.conversationId),
      };
    });
  },
});

export const writeMessage = mutation({
  args: {
    worldId: v.id('worlds'),
    conversationId,
    messageUuid: v.string(),
    playerId,
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('messages', {
      conversationId: args.conversationId,
      author: args.playerId,
      messageUuid: args.messageUuid,
      text: args.text,
      worldId: args.worldId,
    });
    await insertInput(ctx, args.worldId, 'finishSendingMessage', {
      conversationId: args.conversationId,
      playerId: args.playerId,
      timestamp: Date.now(),
    });
  },
});
