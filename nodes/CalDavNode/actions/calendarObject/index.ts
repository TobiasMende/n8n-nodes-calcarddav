import {INodeProperties} from "n8n-workflow";
import * as fetchObjects from './fetchObjects'

export {fetchObjects}
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
				name: 'Fetch Objects',
				value: 'fetchObjects',
				description: 'Fetch objects from calendar',
				action: 'Fetch objects from calendar'
			}
		],
		default: 'fetchObjects'
	},
	...fetchObjects.description
]
