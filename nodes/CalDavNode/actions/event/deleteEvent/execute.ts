import {IExecuteFunctions, INodeExecutionData, NodeOperationError} from "n8n-workflow";
import {createClient} from "../../../../../transport/davClient";

// @ts-ignore
import ical from "ical"

export async function deleteEvent(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const eventUrl = this.getNodeParameter('event_url', index) as string;
	const eventEtag = this.getNodeParameter('event_etag', index) as string;

	const client = await createClient(this, 'caldav');

	// Perform event creation oon remote server
	const result = await client.deleteCalendarObject({
		calendarObject: {
			url: eventUrl,
			etag: eventEtag,
		},
	});

	if (!result.ok) {
		throw new NodeOperationError(
			this.getNode(),
			`Unable to delete event "${eventUrl}", remote server returned error "${result.statusText}"`,
		);
	}

	return this.helpers.returnJsonArray({
		ok: true,
		result: result,
	});
}
