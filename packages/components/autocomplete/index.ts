import { withInstall } from '@/utils'
import autocomplete from '@/components/autocomplete/autocomplete.vue'

const Autocomplete = withInstall(autocomplete)

export type * from '@/components/autocomplete/props'
export { Autocomplete, Autocomplete as default }
