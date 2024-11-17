import {EventProperties} from "../../Interface";

export const description: EventProperties = [
	{
		displayName: 'Event URL',
		name: 'event_url',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['deleteEvent'],
			},
		},
	},
	{
		displayName: 'Event Etag',
		name: 'event_etag',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['deleteEvent'],
			},
		},
	},
]
