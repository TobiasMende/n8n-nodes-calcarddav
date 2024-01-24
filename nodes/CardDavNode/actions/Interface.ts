import {AllEntities, Entity, PropertiesOf} from "n8n-workflow";

type CardDavMap = {
	addressBook: 'fetchContacts'
	contact: 'get' | 'update' | 'delete'
}

export type CardDav = AllEntities<CardDavMap>
export type CardDavAddressBook = Entity<CardDavMap, 'addressBook'>
export type CardDavContact = Entity<CardDavMap, 'contact'>

export type AddressBookProperties = PropertiesOf<CardDavAddressBook>
export type ContactProperties = PropertiesOf<CardDavContact>
