import { createEvent } from "seyfert";
import { MessageType } from "seyfert/lib/types";

export default createEvent({
    data: {
        name: 'raw'
    },
    async run(packet, client) {
        if (packet.t !== 'MESSAGE_UPDATE' || !packet.d.author) return;
        // @ts-expect-error IDE bug
        await client.handleCommand.message({
            attachments: packet.d.attachments ?? [],
            content: packet.d.content ?? '',
            id: packet.d.id,
            guild_id: packet.d.guild_id,
            author: packet.d.author,
            channel_id: packet.d.channel_id,
            member: packet.d.member,
            edited_timestamp: packet.d.edited_timestamp ?? null,
            embeds: packet.d.embeds ?? [],
            mention_everyone: packet.d.mention_everyone ?? false,
            mentions: packet.d.mentions,
            mention_roles: packet.d.mention_roles ?? [],
            pinned: packet.d.pinned ?? false,
            reactions: packet.d.reactions,
            timestamp: packet.d.timestamp ?? new Date().toISOString(),
            tts: packet.d.tts ?? false,
            type: packet.d.type ?? MessageType.Default,
            activity: packet.d.activity,
            application: packet.d.application,
            application_id: packet.d.application_id,
            components: packet.d.components,
            call: packet.d.call,
            flags: packet.d.flags,
            interaction_metadata: packet.d.interaction_metadata,
            message_reference: packet.d.message_reference,
            mention_channels: packet.d.mention_channels,
            nonce: packet.d.nonce,
            poll: packet.d.poll,
            position: packet.d.position,
            referenced_message: packet.d.referenced_message,
            resolved: packet.d.resolved,
            role_subscription_data: packet.d.role_subscription_data,
            sticker_items: packet.d.sticker_items,
            thread: packet.d.thread,
            webhook_id: packet.d.webhook_id,
        }, packet.d.guild_id ? client.gateway.calculateShardId(packet.d.guild_id) : 0)
    },
})