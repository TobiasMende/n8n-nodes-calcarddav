import {IExecuteFunctions, INodeExecutionData} from "n8n-workflow";
import {createClient} from "../../../../../transport/davClient";
import {DAVCalendar} from "tsdav";
// import {parseCard} from "../../../../../transport/davResponseParser";

export async function fetchObjects(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const client = await createClient(this, 'caldav')
	const calendarObjectUrl = this.getNodeParameter('calendar', index)

	const calendars: DAVCalendar[] = await client.fetchCalendars()

	const calendar = calendars.find(obj => {
		return obj.url === calendarObjectUrl
	})

	// const request = {
	// 	url: calendarObjectUrl,
	// 	props: [
	// 		{
	// 			name: 'getetag',
	// 			namespace: DAVNamespace.DAV
	// 		}
	// 	],
	// 	filters: [
	// 		{
	// 			'comp-filter': {
	// 				_attributes: {
	// 					name: 'VCALENDAR',
	// 				},
	// 			},
	// 		},
	// 	],
	// 	depth: '1'
	// };
	// const response: DAVResponse[] = await client.calendarQuery(request)

	const response = await client.fetchCalendarObjects({
		calendar: calendar,
		timeRange: {
			start: '2024-11-10T00:00:00Z',
			end: '2024-11-10T23:59:00Z'
		}
	});

	return this.helpers.returnJsonArray({
		response,
	})
}
