import { camelCase } from 'change-case'

export function convertStringToPropName(str) {
	return camelCase(str.replace(' ', ''))
}