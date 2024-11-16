import {AllEntities, Entity, PropertiesOf} from "n8n-workflow";

type CalDavMap = {
	calendar: 'fetchEvents' | 'createEvent'
	event: 'deleteEvent'
}

export type CalDav = AllEntities<CalDavMap>
export type CalDavCalendar = Entity<CalDavMap, 'calendar'>
export type CalDavEvent = Entity<CalDavMap, 'event'>

export type CalendarProperties = PropertiesOf<CalDavCalendar>
export type EventProperties = PropertiesOf<CalDavEvent>
