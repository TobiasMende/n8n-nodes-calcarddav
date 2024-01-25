import {INodeProperties} from "n8n-workflow";
import * as get from './get'

export {get}
export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact']
			}
		},
		options: [
			{
				name: 'Get Contact',
				value: 'get',
				description: 'Get contact as VCF',
				action: 'Get contact as VCF'
			}
		],
		default: 'get'
	},
	...get.description
]
