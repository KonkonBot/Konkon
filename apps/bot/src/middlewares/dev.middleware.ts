import { createMiddleware } from "seyfert";
import { values } from "lodash";

export const devMiddleware = createMiddleware<void>(async (middle) => {
	if (!values(middle.context.developers).some((x) => x === middle.context.author.id)) {
		return middle.stop("Too bad commander! You are not a developer!");
	}

	return middle.next();
});
