import { IconType } from './Icon'

export interface ActionsheetOptionsItemType {
	label?: string
	loading?: boolean
	icon?: IconType
	placement?: 'left' | 'right'
	disabled?: boolean
}
