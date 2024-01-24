import {INodeProperties} from "n8n-workflow";
import * as fetchContacts from './fetchContacts'

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['addressBook']
			}
		},
		options: [
			{
				name: 'Fetch Contacts',
				value: 'fetchContacts',
				description: 'Fetch contacts from an address book',
				action: 'Fetch contacts from an address book'
			}
		],
		default: 'fetchContacts'
	},
	...fetchContacts.description
]
