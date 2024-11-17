import {INodeProperties} from "n8n-workflow";
import * as fetchEvents from './fetchEvents'
import * as createEvent from './createEvent'

export {fetchEvents, createEvent}
export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['calendar']
			}
		},
		options: [
			{
				name: 'Fetch Events',
				value: 'fetchEvents',
				description: 'Fetch events from calendar',
				action: 'Fetch events from calendar'
			},
			{
				name: 'Create Event',
				value: 'createEvent',
				description: 'Create event in calendar',
				action: 'Create event in calendar'
			},
		],
		default: 'fetchEvents'
	},
	...fetchEvents.description,
	...createEvent.description
]
