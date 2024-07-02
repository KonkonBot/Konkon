import { Image, createCanvas } from "@napi-rs/canvas";
import { ofetch } from "ofetch";
import type { App } from "#/index";
import { UserInfoSchema } from "#/schemas/images/user/userinfo.schema";

/**
 * I don't known where to put this
 * TODO: move to a better place, i think :3
 */

export default (app: App) =>
	app.post(
		"",
		async ({ body: { user } }) => {
			const canvas = createCanvas(100, 100);
			const ctx = canvas.getContext("2d");

			const avatar = await ofetch(user.avatarUrl, { responseType: "arrayBuffer" });
			const avatarImage = new Image();
			avatarImage.src = Buffer.from(avatar);

			ctx.drawImage(avatarImage, 0, 0, 100, 100);

			return canvas.toBuffer("image/png");
		},
		UserInfoSchema,
	);
