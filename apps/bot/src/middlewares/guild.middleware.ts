import { createMiddleware } from "seyfert";

export const guildMiddleware = createMiddleware<void>(async (middle) => {
	if (!middle.context.guildId) {
		return middle.stop("You need to be in a guild to use this command!");
	}
	
	return middle.next();
});
