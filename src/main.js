import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import Card from 'primevue/card'
import Button from 'primevue/button'


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


app.use(store).use(router).use(PrimeVue).mount('#app');
app.component('Card', Card)
app.component('Button', Button)


