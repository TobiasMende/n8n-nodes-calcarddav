import {INodeProperties} from "n8n-workflow";
import * as fetchEvents from './fetchEvents'

export {fetchEvents}
export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['calendarObject']
			}
		},
		options: [
			{
				name: 'Fetch Events',
				value: 'fetchEvents',
				description: 'Fetch events from calendar',
				action: 'Fetch events from calendar'
			}
		],
		default: 'fetchEvents'
	},
	...fetchEvents.description
]
