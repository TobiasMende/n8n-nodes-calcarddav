import {AllEntities, Entity, PropertiesOf} from "n8n-workflow";

type CalDavMap = {
	calendarObject: 'fetchEvents' | 'createEvent'
	event: 'deleteEvent'
}

export type CalDav = AllEntities<CalDavMap>
export type CalDavCalendarObject = Entity<CalDavMap, 'calendarObject'>
export type CalDavEvent = Entity<CalDavMap, 'event'>

export type CalendarObjectProperties = PropertiesOf<CalDavCalendarObject>
export type EventProperties = PropertiesOf<CalDavEvent>
