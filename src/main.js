import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import 'nprogress/nprogress.css'

// PrimeVue Styling
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

// FontAwesome Libraries
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faAmazon } from '@fortawesome/free-brands-svg-icons';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar  from 'primevue/calendar'
import Dialog from 'primevue/dialog'
import Password from 'primevue/password';
import Divider from 'primevue/divider';
import BlockUI from 'primevue/blockui';
import ProgressSpinner from 'primevue/progressspinner';





import GAuth from 'vue3-google-oauth2';
const gAuthOptions = { 
    clientId: "854809495249-5ot1f698ginq2k2g9lsc2b2o6hnnpjas.apps.googleusercontent.com",
    scope: 'email',
    prompt: 'consent',
    fetch_basic_profile: false
}

const app = createApp(App);

Sentry.init({
  app,
  dsn: "https://782c5b0ff34f48659f300d583b1ebc76@o1055455.ingest.sentry.io/6041547",
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  logErrors: true
});

app.use(ConfirmationService);
app.use(ToastService);
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
app.component('BlockUI', BlockUI);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Toast', Toast);

library.add(faFacebook, faUserSecret, faAmazon);
app.component('font-awesome-icon', FontAwesomeIcon);

app.provide('googleAuth', app.config.globalProperties.$gAuth);

