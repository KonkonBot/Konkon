import { createEvent } from "seyfert";

export default createEvent({
    data: { once: true, name: "botReady" },
    run(user, client) {
        client.logger.info(`${user.username} is ready`);
    }
})