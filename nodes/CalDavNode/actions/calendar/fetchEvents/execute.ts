import {IExecuteFunctions, INodeExecutionData} from "n8n-workflow";
import {createClient} from "../../../../../transport/davClient";
import {DAVCalendar, DAVCalendarObject} from "tsdav";
import { CalendarComponent, VEvent } from "../../../ical";

// @ts-ignore
import ical from "ical";

export async function fetchObjects(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const client = await createClient(this, 'caldav');
	const calendarObjectUrl = this.getNodeParameter('calendar', index);
	const startDateString = this.getNodeParameter('start_date', index) as string;
	const endDateString = this.getNodeParameter('end_date', index) as string;

	// parse string to date in utc
	const startDate = new Date(startDateString + 'Z');
	const endDate = new Date(endDateString + 'Z');

	// Retrieve calendars
	const calendars: DAVCalendar[] = await client.fetchCalendars();
	const calendar = calendars.find(obj => {
		return obj.url === calendarObjectUrl;
	});

	// Retrieve calendar objects
	const response: DAVCalendarObject[] = await client.fetchCalendarObjects({
		calendar: calendar,
		timeRange: {
			start: startDate.toISOString(),
			end: endDate.toISOString()
		}
	});

	// Parse to events
	const events = response.map(r => {
		const data = Object.values<CalendarComponent>(ical.parseICS(r.data));
		const events = data.filter((item) => item.type === 'VEVENT') as VEvent[];

		return {
			url: r.url,
			etag: r.etag,
			event: events[0]
		};
	});

	return this.helpers.returnJsonArray({
		events: events,
	});
}
