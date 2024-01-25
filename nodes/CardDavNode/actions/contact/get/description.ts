import {ContactProperties} from "../../Interface";

export const description: ContactProperties = [
	{
		displayName: 'Select Address Book or Set URL Name or ID',
		name: 'addressBook',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'fetchAddressBooks'
		},
		options: [],
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['get']
			}
		},
		description: 'Address book to work with. Choose from the list, or specify an URL using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'File Name',
		name: 'contactFileName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['get']
			}
		},
		description: 'The ID of the contact to retrieve'
	}
]
