import {IExecuteFunctions, INodeExecutionData, NodeOperationError} from "n8n-workflow";
import {createClient} from "../../../../../transport/davClient";
import {DAVCalendar} from "tsdav";
import {EventAttributes, createEvent as icsCreateEvent} from "ics";
import { v4 as uuidv4 } from 'uuid';

// @ts-ignore
import ical from "ical"

export async function createEvent(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const eventTitle = this.getNodeParameter('event_title', index) as string;
	const eventDescription = this.getNodeParameter('event_description', index) as string;
	const eventStartDate = this.getNodeParameter('event_start_date', index) as string;
	const eventEndDate = this.getNodeParameter('event_end_date', index) as string;

	const client = await createClient(this, 'caldav');
	const calendarObjectUrl = this.getNodeParameter('calendar', index);

	// Retrieve calendars
	const calendars: DAVCalendar[] = await client.fetchCalendars();
	const calendar = calendars.find(obj => {
		return obj.url === calendarObjectUrl;
	});

	// Prepare iCal data
	let startDate = new Date(eventStartDate + 'Z');
	let endDate = new Date(eventEndDate + 'Z');

	const event: EventAttributes = {
		uid: uuidv4(),
		start: [
			startDate.getFullYear(),
			startDate.getMonth() + 1,
			startDate.getDate(),
			startDate.getHours(),
			startDate.getMinutes()
		],
		end: [
			endDate.getFullYear(),
			endDate.getMonth() + 1,
			endDate.getDate(),
			endDate.getHours(),
			endDate.getMinutes()
		],
		title: eventTitle,
		description: eventDescription,
		status: 'CONFIRMED',
	};

	const { error, value: iCalString } = icsCreateEvent(event);
	if (error) {
		throw new NodeOperationError(
			this.getNode(),
			`Unable to create iCalendar event`,
		);
	}

	// Perform event creation oon remote server
	const result = await client.createCalendarObject({
		calendar: calendar,
		filename: event.uid + ".ics",
		iCalString: iCalString,
	});

	if (!result.ok) {
		throw new NodeOperationError(
			this.getNode(),
			`Unable to create event in calendar "${calendar!.displayName}", remote server returned error "${result.statusText}"`,
		);
	}

	return this.helpers.returnJsonArray({
		ok: true,
		result: result,
	});
}
