import {CalendarObjectProperties} from "../../Interface";

export const description: CalendarObjectProperties = [
	{
		displayName: 'Select Calendar or Set URL Name or ID',
		name: 'calendar',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'fetchCalendars'
		},
		options: [],
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['calendarObject'],
				operation: ['fetchObjects']
			}
		},
		description: 'Calendar to work with. Choose from the list, or specify an URL using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	}
]
