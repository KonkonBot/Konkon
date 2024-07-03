import type { schema } from "@seifato/db";
import type { CommandContext } from "seyfert";

export default {
	commands: {
		tags: {
			get: {
				name: "get",
				description: "Get a tag.",
				errors: (ctx: CommandContext) => {
					return {
						notFound: (tag: string) => {
							return ctx.write({
								content: `Tag not found: \`${tag.slice(0, 200)}\``,
							});
						},
					};
				},
			},
			add: {
				description: "Create a new tag.",
				modal: {
					title: "Tag creation",
					name: {
						label: "Name",
					},
					content: {
						label: "Content",
						placeholder: "the content of the tag.",
					},
				},
				successMessage: (tag: string) => {
					return `Tag created: \`${tag}\``;
				},
			},
			edit: {
				description: "Edit an existing tag.",
				modal: {
					title: "Tag update",
					name: {
						label: "Name",
					},
					content: {
						label: "Content",
						placeholder: "the new content of the tag.",
					},
				},
				errorMessage: (tag: string) => {
					return `Tag not found: \`${tag}\``;
				},
				successMessage: (tag: string) => {
					return `Tag updated: \`${tag}\``;
				},
			},
			list: {
				description: "List all tags in the server or user.",
				embed: {
					title: "Tags",
					description: (ownerId: string | undefined, guildName: string) => {
						return ownerId ? `Tags in user: \`<@${ownerId}>\`` : `Tags in server: \`${guildName}\``;
					},
					fieldValue: (tag: schema.Tags["$inferInsert"]) => {
						return `Owner: <@${tag.ownerId}> | Uses: \`${tag.uses}\``;
					},
				},
				errors: {
					notFound: (ownerId: string | undefined, guildId: string | undefined) => {
						return ownerId
							? `Tags not found for user: \`<@${ownerId}>\``
							: `Tags not found for server: \`${guildId}\``;
					},
				},
			},
		},
	},
	messages: {
		notDeveloper: {
			message: "You are not a developer.",
		},
	},
};
