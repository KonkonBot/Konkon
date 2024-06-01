import type { CommandContext } from "seyfert";
import type defaultLang from "./en";

export default {
	commands: {
		tags: {
			get: {
				name: "get",
				description: "Obtiene un tag. :D",
				errors: (ctx: CommandContext) => {
					return {
						notFound: (tag: string) => {
							return ctx.write({
								content: `Tag no encontrado: \`${tag.slice(0, 200)}\``,
							});
						},
					};
				},
			},
			add: {
				description: "Crea un nuevo tag. :D",
				modal: {
					title: "Creación de tag",
					name: {
						label: "Nombre",
					},
					content: {
						label: "Contenido",
					},
				},
				successMessage: (tag: string) => {
					return `Tag creado: \`${tag}\``;
				},
			},
		},
	},
} satisfies typeof defaultLang;
