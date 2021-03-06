import {
	Select,
	Option,
	Input,
	Radio,
	Row,
	Upload,
	Form,
	FormItem,
	Button,
	Pagination,
	Message,
	MessageBox,
	Menu,
	MenuItem,
	RadioGroup,
	DropdownMenu,
	DropdownItem,
	Dropdown,
	Drawer,
	Tooltip,
	Slider,
	PageHeader,
	//未使用的组件库
	// OptionGroup,
	InputNumber,
	// Tree,
	Dialog,
	// Col,
	// Checkbox,
	// CheckboxButton,
	// CheckboxGroup,
	// Cascader,
	// Switch,
	// TimeSelect,
	// TimePicker,
	// DatePicker,
	// Rate,
	// ColorPicker,
	// Transfer,
	// Table,
	// TableColumn,
	// Tag,
	// Progress,
	// Badge,
	// Avatar,
	// Alert,
	// Loading,
	// Notification,
	// MenuItemGroup,
	Submenu,
	// RadioButton,

} from 'element-ui'
const element = {
	install: function (Vue) {
		//自己验证漏引入的组件库
		Vue.use(Select)
		Vue.use(Option)
		Vue.use(Input)
		Vue.use(Radio)
		Vue.use(Row)
		Vue.use(Upload)
		Vue.use(Form)
		Vue.use(FormItem)
		Vue.use(Button)
		Vue.use(Pagination)
		Vue.use(Menu)
		Vue.use(MenuItem)
		Vue.use(RadioGroup)
		Vue.use(DropdownItem)
		Vue.use(DropdownMenu)
		Vue.use(Dropdown)
		Vue.use(Drawer)
		Vue.use(Tooltip)
		Vue.use(Slider)
		Vue.use(PageHeader)
		// Vue.use(OptionGroup)
		Vue.use(InputNumber)
		// Vue.use(Tree)
		Vue.use(Dialog)
		// Vue.use(Col)
		// Vue.use(Checkbox)
		// Vue.use(CheckboxButton)
		// Vue.use(CheckboxGroup)
		// Vue.use(Cascader)
		// Vue.use(Switch)
		// Vue.use(TimePicker)
		// Vue.use(TimeSelect)
		// Vue.use(DatePicker)
		// Vue.use(Rate)
		// Vue.use(ColorPicker)
		// Vue.use(Transfer)
		// Vue.use(Table)
		// Vue.use(TableColumn)
		// Vue.use(Tag)
		// Vue.use(Progress)
		// Vue.use(Badge)
		// Vue.use(Avatar)
		// Vue.use(Alert)
		// Vue.use(Loading)
		// Vue.use(MenuItemGroup)
		Vue.use(Submenu)
		// Vue.use(RadioButton)


		Vue.prototype.$message = Message;
		Vue.prototype.$confirm = MessageBox.confirm;
		// Vue.prototype.$alert = MessageBox.alert;
		// Vue.prototype.$notify = Notification;

	}
}

export default element;