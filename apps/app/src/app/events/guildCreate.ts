import { createEvent } from "seyfert";

export default createEvent({
    data: { once:true, name: "guildCreate" },
    run(guild, client) {
        client.logger.info(`New guild: ${guild.name}`);
    }
})