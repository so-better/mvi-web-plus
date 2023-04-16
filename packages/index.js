/***** 全局默认样式 *****/
import './css/mvi-default.less'
/***** 辅助样式 *****/
import './css/mvi-support.less'
/***** dap工具类 *****/
import { Dap } from './components/dap'
/***** 指令 *****/
import { Anchor } from './components/anchor'
import { Resize } from './components/resize'
import { Drag } from './components/drag'
import { Prop } from './components/prop'
import { Scroll } from './components/scroll'
import { Spy } from './components/spy'
import { Observe } from './components/observe'
import { Upload } from './components/upload'
import { Px } from './components/px'
import { Ripple } from './components/ripple'
/***** 组件 *****/
import { Button } from './components/button'
import { Icon } from './components/icon'
import { Cell } from './components/cell'
import { CellGroup } from './components/cell-group'
import { Navbar } from './components/navbar'
import { Tabbar } from './components/tabbar'
import { Image } from './components/image'
import { Overlay } from './components/overlay'
import { Popup } from './components/popup'
import { Checkbox } from './components/checkbox'
import { Radio } from './components/radio'
import { DatePicker } from './components/date-picker'
import { DateNativePicker } from './components/date-native-picker'
import { Input } from './components/input'
import { Modal } from './components/modal'
import { Dialog } from './components/dialog'
import { Toast } from './components/toast'
import { Loading } from './components/loading'
import { Msgbox } from './components/msgbox'
import { NumberKeyboard } from './components/number-keyboard'
import { Search } from './components/search'
import { Progress } from './components/progress'
import { Slider } from './components/slider'
import { Stepper } from './components/stepper'
import { Switch } from './components/switch'
import { Actionsheet } from './components/actionsheet'
import { Dropdown } from './components/dropdown'
import { Notify } from './components/notify'
import { PullRefresh } from './components/pull-refresh'
import { SwipeCell } from './components/swipe-cell'
import { CircleProgress } from './components/circle-progress'
import { Collapse } from './components/collapse'
import { CollapseItem } from './components/collapse-item'
import { Divider } from './components/divider'
import { Roll } from './components/roll'
import { Panel } from './components/panel'
import { Steps } from './components/steps'
import { Step } from './components/step'
import { Label } from './components/label'
import { Swiper } from './components/swiper'
import { SwiperSlide } from './components/swiper-slide'
import { Tabs } from './components/tabs'
import { Tab } from './components/tab'
import { Badge } from './components/badge'
import { Table } from './components/table'
import { Calendar } from './components/calendar'
import { Triangle } from './components/triangle'
import { Tooltip } from './components/tooltip'
import { ColorPicker } from './components/color-picker'
import { ImagePreview } from './components/image-preview'
import { Page } from './components/page'
import { LoadingBar } from './components/loading-bar'
import { Picker } from './components/picker'
import { TransitionSlide } from './components/transition-slide'
import { List } from './components/list'
import { Skeleton } from './components/skeleton'
import { Sign } from './components/sign'
/***** PC端专用的组件 *****/
import { Layer } from './components/layer'
import { Select } from './components/select'
import { Autocomplete } from './components/autocomplete'
import { DateChooser } from './components/date-chooser'
import { Field } from './components/field'
import { Editor } from './components/editor'
import { EditorMenus } from './components/editor-menus'
import { Row } from './components/row'
import { Col } from './components/col'
import { Form } from './components/form'
import { FormEl } from './components/form-el'

/***** 按需导出 *****/
export * from './components/dap'
export * from './components/anchor'
export * from './components/resize'
export * from './components/drag'
export * from './components/prop'
export * from './components/scroll'
export * from './components/spy'
export * from './components/observe'
export * from './components/upload'
export * from './components/px'
export * from './components/ripple'
export * from './components/button'
export * from './components/icon'
export * from './components/cell'
export * from './components/cell-group'
export * from './components/navbar'
export * from './components/tabbar'
export * from './components/image'
export * from './components/overlay'
export * from './components/popup'
export * from './components/checkbox'
export * from './components/radio'
export * from './components/date-picker'
export * from './components/date-native-picker'
export * from './components/input'
export * from './components/modal'
export * from './components/dialog'
export * from './components/toast'
export * from './components/loading'
export * from './components/msgbox'
export * from './components/number-keyboard'
export * from './components/search'
export * from './components/progress'
export * from './components/slider'
export * from './components/stepper'
export * from './components/switch'
export * from './components/actionsheet'
export * from './components/dropdown'
export * from './components/notify'
export * from './components/pull-refresh'
export * from './components/swipe-cell'
export * from './components/circle-progress'
export * from './components/collapse'
export * from './components/collapse-item'
export * from './components/divider'
export * from './components/roll'
export * from './components/panel'
export * from './components/steps'
export * from './components/step'
export * from './components/label'
export * from './components/swiper'
export * from './components/swiper-slide'
export * from './components/tabs'
export * from './components/tab'
export * from './components/badge'
export * from './components/table'
export * from './components/calendar'
export * from './components/triangle'
export * from './components/tooltip'
export * from './components/color-picker'
export * from './components/image-preview'
export * from './components/page'
export * from './components/loading-bar'
export * from './components/picker'
export * from './components/transition-slide'
export * from './components/list'
export * from './components/skeleton'
export * from './components/sign'
export * from './components/layer'
export * from './components/select'
export * from './components/autocomplete'
export * from './components/date-chooser'
export * from './components/field'
export * from './components/editor'
export * from './components/editor-menus'
export * from './components/row'
export * from './components/col'
export * from './components/form'
export * from './components/form-el'

/***** 全局导出 *****/
const install = app => {
	const components = {
		Dap,
		Anchor,
		Resize,
		Drag,
		Prop,
		Scroll,
		Spy,
		Observe,
		Upload,
		Px,
		Ripple,
		Button,
		Icon,
		Cell,
		CellGroup,
		Navbar,
		Tabbar,
		Image,
		Overlay,
		Popup,
		Checkbox,
		Radio,
		DatePicker,
		DateNativePicker,
		Input,
		Modal,
		Dialog,
		Toast,
		Loading,
		Msgbox,
		NumberKeyboard,
		Search,
		Progress,
		Slider,
		Stepper,
		Switch,
		Actionsheet,
		Dropdown,
		Notify,
		PullRefresh,
		SwipeCell,
		CircleProgress,
		Collapse,
		CollapseItem,
		Divider,
		Roll,
		Panel,
		Steps,
		Step,
		Label,
		Swiper,
		SwiperSlide,
		Tabs,
		Tab,
		Badge,
		Table,
		Calendar,
		Triangle,
		Tooltip,
		ColorPicker,
		ImagePreview,
		Page,
		LoadingBar,
		Picker,
		TransitionSlide,
		List,
		Skeleton,
		Sign,
		Layer,
		Select,
		Autocomplete,
		DateChooser,
		Field,
		Editor,
		EditorMenus,
		Row,
		Col,
		Form,
		FormEl
	}
	//注册组件和指令
	Object.values(components).map(component => {
		component.install(app)
	})
}

/***** 版本号 *****/
const version = '1.6.28'

const stdin_default = {
	install,
	version
}

export { stdin_default as default, install, version }
