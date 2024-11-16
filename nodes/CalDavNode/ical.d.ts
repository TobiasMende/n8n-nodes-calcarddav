// orignal: https://github.com/rene-mueller/n8n-nodes-ics-parser/blob/9c4284badee286d7da797ee127b924f561053c8d/types/ical.d.ts
import {IDataObject} from "n8n-workflow/dist/src/Interfaces";

export type CalendarResponse = Record<string, CalendarComponent>;

export type CalendarComponent = VTimeZone | VEvent | VCalendar;

export type VTimeZone = TimeZoneProps & TimeZoneDictionary;

interface TimeZoneProps extends BaseComponent {
	type: 'VTIMEZONE';
	tzid: string;
	tzurl: string;
}

type TimeZoneDictionary = Record<string, TimeZoneDef | undefined>;

export interface VEvent extends BaseComponent {
	type: 'VEVENT';
	method: Method;
	dtstamp: DateWithTimeZone;
	uid: string;
	sequence: string;
	transparency: Transparency;
	class: Class;
	summary: string;
	start: DateWithTimeZone;
	datetype: DateType;
	end: DateWithTimeZone;
	location: string;
	description: string;
	url: string;
	completion: string;
	created: DateWithTimeZone;
	lastmodified: DateWithTimeZone;
	attendee?: Attendee[] | Attendee;
	/* eslint-disable-next-line @typescript-eslint/ban-types */
	recurrences?: Record<string, Omit<VEvent, 'recurrences'>>;
	status?: VEventStatus;

	// I am not entirely sure about these, leave them as any for now..
	organizer: Organizer;
	exdate: string;
	geo: string;
	recurrenceid: string;
}

/**
 * Contains alls metadata of the Calendar
 */
export interface VCalendar extends BaseComponent {
	type: 'VCALENDAR';
	prodid?: string;
	version?: string;
	calscale?: 'GREGORIAN' | string;
	method?: Method;
	'WR-CALNAME'?: string;
	'WR-TIMEZONE'?: string;
}

export interface BaseComponent extends IDataObject {
	params: string[];
}

export interface TimeZoneDef {
	type: 'DAYLIGHT' | 'STANDARD';
	params: string[];
	tzoffsetfrom: string;
	tzoffsetto: string;
	tzname: string;
	start: DateWithTimeZone;
	dateType: DateType;
	rrule: string;
	rdate: string | string[];
}

type Property<A> = PropertyWithArgs<A> | string;

interface PropertyWithArgs<A> {
	val: string;
	params: A & Record<string, unknown>;
}

export type Organizer = Property<{
	CN?: string;
}>;

export type Attendee = Property<{
	CUTYPE?: 'INDIVIDUAL' | 'UNKNOWN' | 'GROUP' | 'ROOM' | string;
	ROLE?: 'CHAIR' | 'REQ-PARTICIPANT' | 'NON-PARTICIPANT' | string;
	PARTSTAT?: 'NEEDS-ACTION' | 'ACCEPTED' | 'DECLINED' | 'TENTATIVE' | 'DELEGATED';
	RSVP?: boolean;
	CN?: string;
	'X-NUM-GUESTS'?: number;
}>;

export type DateWithTimeZone = Date & {tz: string};
export type DateType = 'date-time' | 'date';
export type Transparency = 'TRANSPARENT' | 'OPAQUE';
export type Class = 'PUBLIC' | 'PRIVATE' | 'CONFIDENTIAL';
export type Method = 'PUBLISH' | 'REQUEST' | 'REPLY' | 'ADD' | 'CANCEL' | 'REFRESH' | 'COUNTER' | 'DECLINECOUNTER';
export type VEventStatus = 'TENTATIVE' | 'CONFIRMED' | 'CANCELLED';
