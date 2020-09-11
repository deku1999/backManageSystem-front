import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$message = Element.Message
Vue.prototype.$confirm = Element.MessageBox.confirm
Vue.use(Element)
