import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css'

// PrimeVue Styling
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faAmazon } from '@fortawesome/free-brands-svg-icons';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar  from 'primevue/calendar'
import Dialog from 'primevue/dialog'
import Password from 'primevue/password';
import Divider from 'primevue/divider';





import GAuth from 'vue3-google-oauth2';
const gAuthOptions = { 
    clientId: "854809495249-5ot1f698ginq2k2g9lsc2b2o6hnnpjas.apps.googleusercontent.com",
    scope: 'email',
    prompt: 'consent',
    fetch_basic_profile: false
}

const app = createApp(App);

app.use(ConfirmationService);
app.use(GAuth, gAuthOptions);
app.use(store).use(router).use(PrimeVue).mount('#app');

// PrimeVue Components
app.component('Card', Card);
app.component('Button', Button);
app.component('ConfirmDialog', ConfirmDialog);
app.component('InputText', InputText);
app.component('Calendar', Calendar);
app.component('Dialog', Dialog);
app.component('Password', Password);
app.component('Divider', Divider);

library.add(faFacebook, faUserSecret, faAmazon);
app.component('font-awesome-icon', FontAwesomeIcon);

app.provide('googleAuth', app.config.globalProperties.$gAuth);

