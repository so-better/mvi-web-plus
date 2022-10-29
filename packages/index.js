/***** 全局默认样式 *****/
import './css/mvi-default.less'
/***** 辅助样式 *****/
import './css/mvi-support.less'
/***** dap工具类 *****/
import Dap from 'dap-util'
/***** 解决ios系统下css伪类无效的问题 *****/
Dap.event.on(window, 'touchstart.ios', e => {})
/***** 指令 *****/
import Anchor from './components/anchor'
import Resize from './components/resize'
import Drag from './components/drag'
import Prop from './components/prop'
import Scroll from './components/scroll'
import Spy from './components/spy'
import Observe from './components/observe'
import Upload from './components/upload'
import Px from './components/px'
/***** 组件 *****/
import Button from './components/button'
import Icon from './components/icon'
import Cell from './components/cell'
import Navbar from './components/navbar'
import Tabbar from './components/tabbar'
import Image from './components/image'
import Overlay from './components/overlay'
import Popup from './components/popup'
import Checkbox from './components/checkbox'
import Radio from './components/radio'
import DatePicker from './components/datePicker'
import DateNativePicker from './components/dateNativePicker'
import Input from './components/input'
import Modal from './components/modal'
import Dialog from './components/dialog'
import Toast from './components/toast'
import Loading from './components/loading'
import Msgbox from './components/msgbox'
import NumberKeyboard from './components/numberKeyboard'
import Search from './components/search'
import Progress from './components/progress'
import Slider from './components/slider'
import Stepper from './components/stepper'
import Switch from './components/switch'
import Actionsheet from './components/actionsheet'
import Dropdown from './components/dropdown'
import Notify from './components/notify'
import PullRefresh from './components/pullRefresh'
import SwipeCell from './components/swipeCell'
import CircleProgress from './components/circleProgress'
import Collapse from './components/collapse'
import Divider from './components/divider'
import Roll from './components/roll'
import Panel from './components/panel'
import Steps from './components/steps'
import Label from './components/label'
import Swiper from './components/swiper'
import Tabs from './components/tabs'
import Badge from './components/badge'
import Table from './components/table'
import Calendar from './components/calendar'
import Triangle from './components/triangle'
import Tooltip from './components/tooltip'
import ColorPicker from './components/colorPicker'
import ImagePreview from './components/imagePreview'
import Page from './components/page'
import LoadingBar from './components/loadingBar'
import Picker from './components/picker'
import TransitionSlide from './components/transitionSlide'
import List from './components/list'
import Skeleton from './components/skeleton'
import Sign from './components/sign'
/***** PC端专用的组件 *****/
import Layer from './components/layer'
import Select from './components/select'
import Autocomplete from './components/autocomplete'
import DateChooser from './components/dateChooser'
import Field from './components/field'
import Editor from './components/editor'
import Grid from './components/grid'
import Form from './components/form'

/***** 按需导出 *****/
export {
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
    Button,
    Icon,
    Cell,
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
    Divider,
    Roll,
    Panel,
    Steps,
    Label,
    Swiper,
    Tabs,
    Badge,
    Table,
    Calendar,
    Tooltip,
    Triangle,
    ColorPicker,
    ImagePreview,
    Page,
    LoadingBar,
    Picker,
    Layer,
    Select,
    Autocomplete,
    DateChooser,
    Editor,
    Field,
    Grid,
    TransitionSlide,
    Form,
    List,
    Skeleton,
    Sign
}

/***** 全局导出的组件和指令 *****/
const components = {
    Anchor,
    Resize,
    Drag,
    Prop,
    Scroll,
    Spy,
    Observe,
    Upload,
    Px,
    Button,
    Icon,
    Cell,
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
    Divider,
    Roll,
    Panel,
    Steps,
    Label,
    Swiper,
    Tabs,
    Badge,
    Table,
    Calendar,
    Tooltip,
    Triangle,
    ColorPicker,
    ImagePreview,
    Page,
    LoadingBar,
    Picker,
    Layer,
    Select,
    Autocomplete,
    DateChooser,
    Editor,
    Field,
    Grid,
    TransitionSlide,
    Form,
    List,
    Skeleton,
    Sign
}

/***** 全局注册 ******/
const install = app => {
    //注册工具类
    app.config.globalProperties.$dap = Dap
    app.provide('$dap', Dap)
    //注册组件和指令
    Object.values(components).map(component => {
        component.install(app)
    })
}

//import时导出install
export default install
