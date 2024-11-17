import {INodeProperties} from "n8n-workflow";
import * as deleteEvent from './deleteEvent'

export {deleteEvent}
export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['event']
			}
		},
		options: [
			{
				name: 'Delete Event',
				value: 'deleteEvent',
				description: 'Delete event in remote calendar',
				action: 'Delete event in remote calendar'
			},
		],
		default: 'deleteEvent'
	},
	...deleteEvent.description,
]
