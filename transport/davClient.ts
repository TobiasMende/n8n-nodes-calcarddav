import {FunctionsBase} from "n8n-workflow";
import {createDAVClient, DAVAccount, DAVCollection} from "tsdav";

export type DavAccountType = 'carddav' | 'caldav'
export interface DavClient {
	fetchAddressBooks: (params?: {
		account?: DAVAccount | undefined;
		props?: object | undefined;
		headers?: Record<string, string> | undefined;
		headersToExclude?: string[] | undefined;
	} | undefined) => Promise<DAVCollection[]>;
}
export async function createClient(options: FunctionsBase, accountType: DavAccountType = 'carddav'): Promise<DavClient> {
	const creds = await options.getCredentials('genericDavCredentialsApi')
	return createDAVClient({
		serverUrl: creds.serverUrl as string,
		credentials: {
			username: creds.username as string,
			password: creds.password as string,
		},
		authMethod: 'Basic',
		defaultAccountType: accountType,
	});
}
