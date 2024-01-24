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
		description: 'Fetch contacts from an address book. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.'
	}
]
