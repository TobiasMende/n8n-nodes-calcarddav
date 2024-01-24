import {IExecuteFunctions, INodeExecutionData} from "n8n-workflow";
import {createClient} from "../../../../../transport/davClient";
import {DAVNamespaceShort, DAVResponse} from "tsdav";
import vCard from "vcf";

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
		return this.helpers.returnJsonArray(responses.map(parseCard))
	} else {
		return Promise.all(responses.map(r => toBinaryItem(this, r)))
	}
}

async function toBinaryItem(fun: IExecuteFunctions, response: DAVResponse): Promise<INodeExecutionData> {
	const card = parseCard(response)
	return {
		json: {
			...card,
			href: response.href as string,
			vcard: response.props?.addressData
		},
	}
}

	function parseProperty(name: string, card: vCard) {
		const property = card.get(name)
		if (!property) {
			return []
		}
		if (property instanceof Array) {
			return property.map(m => m.valueOf())
		}
		return [property.valueOf()]
	}

	function parseSimpleProperty(name: string, card: vCard) {
		return card.get(name)?.valueOf()
	}

	function parseCard(rawCard: DAVResponse) {
		if (!rawCard.props) {
			return {}
		}
		const card = new vCard().parse(rawCard.props.addressData)
		console.log(Object.keys(card.data))
		return {
			uid: parseSimpleProperty('uid', card),
			fullName: parseSimpleProperty('fn', card),
			emails: parseProperty('email', card),
			telephoneNumbers: parseProperty('tel', card),
			addresses: parseProperty('adr', card),
			birthDay: parseSimpleProperty('bday', card),
		}
	}
