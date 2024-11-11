import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription, NodeOperationError,
} from 'n8n-workflow';
import {calendarObject} from "./actions";
import {loadOptions} from "./methods";
import {CalDav} from "./actions/Interface";

export class CalDavNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CalDAV Node',
		name: 'calDavNode',
		group: ['output'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Use a CalDAV Server',
		defaults: {
			name: 'CalDAV Node',
		},
		credentials: [
			{
				name: 'genericDavCredentialsApi',
				required: false,
			},
		],
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Calendar Object',
						value: 'calendarObject'
					},
					// {
					// 	name: 'Contact',
					// 	value: 'contact'
					// }
				],
				default: 'calendarObject'
			},
			...calendarObject.descriptions,
			// ...contact.descriptions
		],
	};

	methods = {loadOptions}

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const operationResult: INodeExecutionData[] = []

		for (let index = 0; index < items.length; index++) {
			const resource = this.getNodeParameter<CalDav>('resource', index)
			const operation = this.getNodeParameter('operation', index)
			const caldav = {
				resource,
				operation
			} as CalDav
			let responseData: IDataObject | IDataObject[] = []
			try {
				if (resource === 'calendarObject') {
					// @ts-ignore
					responseData = await calendarObject[caldav.operation].execute.call(this, index)
				// } else if (resource === 'contact') {
				// 	// @ts-ignore
				// 	responseData = await contact[carddav.operation].execute.call(this, index)
				} else {
					throw new NodeOperationError(this.getNode(), `unknown resource: ${resource}`)
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{itemData: {item: index}},
				);
				operationResult.push(...executionData);
			} catch (err) {
				if (this.continueOnFail()) {
					operationResult.push({json: this.getInputData(index)[0].json, error: err})
				} else {
					if (err.context) err.context.itemIndex = index;
					throw err;
				}
			}
		}

		return [operationResult]
	}
}