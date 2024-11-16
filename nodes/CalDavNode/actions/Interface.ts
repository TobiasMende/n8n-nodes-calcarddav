import {AllEntities, Entity, PropertiesOf} from "n8n-workflow";

type CalDavMap = {
	calendarObject: 'fetchEvents' | 'createEvent'
}

export type CalDav = AllEntities<CalDavMap>
export type CalDavCalendarObject = Entity<CalDavMap, 'calendarObject'>

export type CalendarObjectProperties = PropertiesOf<CalDavCalendarObject>
