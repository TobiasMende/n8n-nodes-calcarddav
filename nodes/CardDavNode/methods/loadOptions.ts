import {ILoadOptionsFunctions, INodePropertyOptions} from "n8n-workflow";
import {createClient} from "../../../transport/davClient";

export async function fetchAddressBooks(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const client = await createClient(this)
	const rawBooks = await client.fetchAddressBooks()
	return rawBooks.map(book => ({
		name: book.displayName as string,
		value: book.url as string
	}))
}
