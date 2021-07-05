import Vue from 'vue'
import {
  Button,
  Input,
  Form,
  FormItem,
  Message,
  Container,
  Header,
  Aside,
  Footer,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  TabPane,
  Tabs,
  Scrollbar,
  Checkbox,
  Icon,
  Tag,
  MessageBox,
  Loading,
  Link,
  Alert,
  Select,
  Option
} from 'element-ui'
// 导入element样式
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Select)
Vue.use(Option)
Vue.use(Alert)
Vue.use(Link)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Tooltip)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Scrollbar)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Tag)
Vue.use(Loading)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
