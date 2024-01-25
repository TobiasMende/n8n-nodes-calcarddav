import {IExecuteFunctions, INodeExecutionData} from "n8n-workflow";
import {createClient} from "../../../../../transport/davClient";
import {DAVNamespaceShort, DAVResponse} from "tsdav";
import {parseCard, SimpleCard} from "../../../../../transport/davResponseParser";

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const client = await createClient(this)
	const addressBookUrl = this.getNodeParameter('addressBook', index) as string
	const contactFileName = this.getNodeParameter('contactFileName', index) as string

	const contactUrl = `${addressBookUrl}${contactFileName}`
	const request = {
		url: addressBookUrl,
		props: {
			[`${DAVNamespaceShort.DAV}:getetag`]: {},
			[`${DAVNamespaceShort.CARDDAV}:address-data`]: {},
		},
		objectUrls: [
			contactUrl
		]
	};
	const responses: DAVResponse[] = await client.addressBookMultiGet(request)
	return Promise.all(responses.map(toBinaryItem))
}

async function toBinaryItem(response: DAVResponse): Promise<INodeExecutionData> {
	let binary = {}
	if (response.props?.addressData) {
		const card = parseCard(response) as SimpleCard
		const addressData = response.props.addressData
		const data = Buffer.from(addressData).toString('base64')
		const mimeType = 'text/x-vcard'
		binary = {data: {data, mimeType, fileName: card.fileName}}
	}
	return {
		json: {},
		binary
	}
}

