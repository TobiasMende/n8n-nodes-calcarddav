import {IExecuteFunctions, INodeExecutionData} from "n8n-workflow";
import {createClient} from "../../../../../transport/davClient";
import {DAVCalendar, DAVCalendarObject} from "tsdav";
import { CalendarComponent, VEvent } from "../../../ical";

// @ts-ignore
import ical from "ical"

export async function fetchObjects(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const client = await createClient(this, 'caldav')
	const calendarObjectUrl = this.getNodeParameter('calendar', index)

	// Retrieve calendars
	const calendars: DAVCalendar[] = await client.fetchCalendars()
	const calendar = calendars.find(obj => {
		return obj.url === calendarObjectUrl
	})

	// Retrieve calendar objects
	const response: DAVCalendarObject[] = await client.fetchCalendarObjects({
		calendar: calendar,
		timeRange: {
			start: '2024-11-16T00:00:00Z',
			end: '2024-11-16T23:59:00Z'
		}
	});

	// Parse to events
	const events = response.map(r => {
		const data = Object.values<CalendarComponent>(ical.parseICS(r.data))
		const events = data.filter((item) => item.type === 'VEVENT') as VEvent[]

		return events[0]
	});

	return this.helpers.returnJsonArray({
		events: events
	})
}
