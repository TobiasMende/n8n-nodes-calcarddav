import {CalendarProperties} from "../../Interface";

export const description: CalendarProperties = [
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
				resource: ['calendar'],
				operation: ['createEvent']
			}
		},
		description: 'Calendar to work with. Choose from the list, or specify an URL using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
	},
	{
		displayName: 'Title',
		name: 'event_title',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createEvent'],
			},
		},
	},
	{
		displayName: 'All Day Event',
		name: 'event_is_all_day',
		type: 'options',
		options: [
			{
				name: 'No',
				value: 'no',
			},
			{
				name: 'Yes',
				value: 'yes',
			},
		],
		default: 'no',
		required: true,
		displayOptions: {
			show: {
				operation: ['createEvent'],
			},
		},
	},
	{
		displayName: 'Start Date',
		name: 'event_start_date',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createEvent'],
			},
		},
		hint: 'Date should be in UTC',
		description: 'Time is ignored for all-day events'
	},
	{
		displayName: 'End Date',
		name: 'event_end_date',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['createEvent'],
			},
		},
		hint: 'Date should be in UTC',
		description: 'Date when event ends. Time is ignored for all-day events. For all-day events, this should be the last day (same as start date for 1 day events).',
	},
	{
		displayName: 'Description',
		name: 'event_description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['createEvent'],
			},
		},
	},
]
