import type { schema } from "@seifato/db";
import type { CommandContext } from "seyfert";
import type defaultLang from "./en";

export default {
	commands: {
		tags: {
			get: {
				name: "get",
				description: "Obten un tag.",
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
				description: "Crea un nuevo tag.",
				modal: {
					title: "Creación de tag",
					name: {
						label: "Nombre",
					},
					content: {
						label: "Contenido",
						placeholder: "el contenido del tag.",
					},
				},
				successMessage: (tag: string) => {
					return `Tag creado: \`${tag}\``;
				},
			},
			edit: {
				description: "Edita un tag existente.",
				modal: {
					title: "Actualización de tag",
					name: {
						label: "Nombre",
					},
					content: {
						label: "Contenido",
						placeholder: "el nuevo contenido del tag.",
					},
				},
				errorMessage: (tag: string) => {
					return `Tag no encontrado: \`${tag}\``;
				},
				successMessage: (tag: string) => {
					return `Tag actualizado: \`${tag}\``;
				},
			},
			list: {
				description: "Lista todos los tags en el servidor o usuario.",
				embed: {
					title: "Tags",
					description: (ownerId: string | undefined, guildName: string) => {
						return ownerId
							? `Tags del usuario: <@${ownerId}>`
							: `Tags del servidor: \`${guildName}\``;
					},
					fieldValue: (tag: schema.Tags["$inferInsert"]) => {
						return `\t- Creador: <@${tag.ownerId}>\n - Usos: \`${tag.uses}\``;
					},
				},
				errors: {
					notFound: (ownerId: string | undefined, guildId: string | undefined) => {
						return ownerId
							? `Tags no encontrados para usuario: \`${ownerId}\``
							: `Tags no encontrados para servidor: \`${guildId}\``;
					},
				},
			},
		},
	},
	messages: {
		notDeveloper: {
			message: "No eres desarrollador.",
		},
	},
} satisfies typeof defaultLang;
