import {ILoadOptionsFunctions, INodePropertyOptions} from "n8n-workflow";
import {createClient} from "../../../transport/davClient";
import {DAVCalendar} from "tsdav";

export async function fetchCalendars(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const client = await createClient(this, 'caldav')
	const rawCalendars: DAVCalendar[] = await client.fetchCalendars()
	return rawCalendars.map(calendar => ({
		name: calendar.displayName as string,
		value: calendar.url as string
	}))
}
