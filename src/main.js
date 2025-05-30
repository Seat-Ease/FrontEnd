import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueKonva from 'vue-konva'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import router from './router'

import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

const app = createApp(App)

library.add(fas, far)
library.add(faTrash)
library.add(faCheck, faTimes)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(VCalendar, {})
app.use(VueKonva)
app.use(createPinia())
app.use(router)

app.mount('#app')
