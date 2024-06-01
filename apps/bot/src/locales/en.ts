import type { CommandContext } from "seyfert";

export default {
	commands: {
		tags: {
			get: {
				name: "get",
				description: "Get a tag. :D",
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
				description: "Create a new tag. :D",
				modal: {
					title: "Tag creation",
					name: {
						label: "Name",
					},
					content: {
						label: "Content",
					},
				},
				successMessage: (tag: string) => {
					return `Tag created: \`${tag}\``;
				},
			},
		},
	},
};
