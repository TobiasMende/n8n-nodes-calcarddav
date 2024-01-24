import {AddressBookProperties} from "../../Interface";

export const description: AddressBookProperties = [
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
				resource: ['addressBook'],
				operation: ['fetchContacts']
			}
		},
		description: 'Fetch contacts from an address book. Choose from the list, or specify an URL using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				resource: ['addressBook'],
				operation: ['fetchContacts']
			}
		},
		default: {},
		options: [
			{
				displayName: 'Simplified Response',
				name: 'simplify',
				type: 'boolean',
				default: false,
				description: 'Whether to return major information instead of vcf binaries'
			}
		]
	}

]
