import { createCanvas } from "@napi-rs/canvas";
import axios from "axios";
import Elysia from "elysia";
import { UserInfoSchema } from "#/schemas/images/user/userinfo.schema";

/**
 * I don't known where to put this
 * TODO: move to a better place, i think :3
 */

export const UserInfoCard = new Elysia().post(
	"/userinfo",
	async ({ body: { user } }) => {
		const canvas = createCanvas(100, 100);
		const ctx = canvas.getContext("2d");

		const avatar = await axios.get(user.avatarUrl);

		ctx.drawImage(avatar.data, 0, 0, 100, 100);

		return canvas.toBuffer("image/png");
	},
	UserInfoSchema,
);
