import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GenericDavCredentialsApi implements ICredentialType {
	name = 'genericDavCredentialsApi';
	displayName = 'Generic CalDav/CardDav Credentials API';
	properties: INodeProperties[] = [
		// The credentials to get from user and save encrypted.
		// Properties can be defined exactly in the same way
		// as node properties.
		{
			displayName: 'User Name',
			name: 'username',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'string',
			default: '',
		},
	];
}
