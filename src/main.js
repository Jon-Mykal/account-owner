import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar  from 'primevue/calendar'
import Dialog from 'primevue/dialog'
import Password from 'primevue/password';


// PrimeVue Styling
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
const app = createApp(App);

app.use(ConfirmationService);
app.use(store).use(router).use(PrimeVue).mount('#app');

// PrimeVue Components
app.component('Card', Card)
app.component('Button', Button)
app.component('ConfirmDialog', ConfirmDialog)
app.component('InputText', InputText)
app.component('Calendar', Calendar)
app.component('Dialog', Dialog)
app.component('Password', Password)

