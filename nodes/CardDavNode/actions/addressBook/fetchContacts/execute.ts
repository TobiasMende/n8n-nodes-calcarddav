import {IExecuteFunctions, INodeExecutionData} from "n8n-workflow";
import {createClient} from "../../../../../transport/davClient";
import {DAVNamespaceShort, DAVResponse} from "tsdav";
import {parseCard} from "../../../../../transport/davResponseParser";

export async function fetchContacts(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const client = await createClient(this)
	const addressBookUrl = this.getNodeParameter('addressBook', index) as string
	const request = {
		url: addressBookUrl,
		props: {
			[`${DAVNamespaceShort.DAV}:getetag`]: {},
			[`${DAVNamespaceShort.CARDDAV}:address-data`]: {},
		},
		depth: '1'
	};
	const responses: DAVResponse[] = await client.addressBookQuery(request)
	const options = this.getNodeParameter('options', index) as {
		simplify: boolean
	}
	if (options.simplify) {
		return this.helpers.returnJsonArray(responses.map(r => parseCard(r) || {}))
	} else {
		return Promise.all(responses.map(toItem))
	}
}

async function toItem(response: DAVResponse): Promise<INodeExecutionData> {
	const card = parseCard(response) || {}
	return {
		json: {
			...card,
			href: response.href as string,
			vcard: response.props?.addressData
		},
	}
}
