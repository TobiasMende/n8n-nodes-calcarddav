import {FunctionsBase} from "n8n-workflow";
import {createDAVClient} from "tsdav";

export type DavAccountType = 'carddav' | 'caldav'

export async function createClient(options: FunctionsBase, accountType: DavAccountType = 'carddav'): Promise<any> {
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
