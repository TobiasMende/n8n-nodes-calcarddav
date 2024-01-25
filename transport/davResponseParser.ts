import vCard from "vcf";
import {DAVResponse} from "tsdav";
import * as path from "path";


export interface SimpleCard {
	fileName: SimpleProperty,
	uid: SimpleProperty,
	fullName: SimpleProperty,
	emails: MultiProperty,
	telephoneNumbers: MultiProperty,
	addresses: MultiProperty,
	birthDay: SimpleProperty,
}

export type MultiProperty = string[]
export type SimpleProperty = string

function parseProperty(name: string, card: vCard): MultiProperty {
	const property = card.get(name)
	if (!property) {
		return []
	}
	if (property instanceof Array) {
		return property.map(m => m.valueOf())
	}
	return [property.valueOf()]
}

function parseSimpleProperty(name: string, card: vCard): SimpleProperty {
	return card.get(name)?.valueOf() as string
}

export function parseCard(rawCard: DAVResponse): SimpleCard | undefined {
	if (!rawCard.props) {
		return undefined
	}
	const card = new vCard().parse(rawCard.props.addressData)
	console.log(Object.keys(card.data))
	return {
		fileName: path.basename(rawCard.href || ''),
		uid: parseSimpleProperty('uid', card),
		fullName: parseSimpleProperty('fn', card),
		emails: parseProperty('email', card),
		telephoneNumbers: parseProperty('tel', card),
		addresses: parseProperty('adr', card),
		birthDay: parseSimpleProperty('bday', card),
	}
}
