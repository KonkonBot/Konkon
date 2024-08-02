import type {Client, LimitedCollection, Message, ParseClient, ParseLocales} from "seyfert";
import type defaultLocale from "./locales/en"

declare module "seyfert" {
	interface UsingClient extends ParseClient<Client<true>> {
		edits: LimitedCollection<string, Message>;
	}
	interface DefaultLocale extends ParseLocales<typeof defaultLocale> {}
	interface InternalOptions {
		asyncCache: true;
		withPrefix: true;
	}
}
