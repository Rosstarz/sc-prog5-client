import {BASE_URL} from './constants.js'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { Toast } from 'bootstrap'

/**
 * @type {HTMLInputElement}
 */
const nameInput = document.getElementById('new-dev-name')
/**
 * @type {HTMLInputElement}
 */
const countryInput = document.getElementById('select-country')
/**
 * @type {HTMLInputElement}
 */
const dateInput = document.getElementById('dev-datepicker');
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById('new-developer-form')
/**
 * @type {HTMLButtonElement}
*/
const addButton = document.getElementById('new-developer-button')
/**
 * @type {HTMLDivElement}
 */
const toastLive = document.getElementById('liveToast')
/**
 * @type {HTMLDivElement}
 */
const liveToastMessage = document.getElementById('liveToastMessage')
/**
 * @type {Toast}
 */
const toastBootstrap = Toast.getOrCreateInstance(toastLive)

const datePicker = flatpickr(dateInput, {})

// Create datepicker
function createDatePicker(){
    datePicker.setDate(new Date());
}

async function addNewGame() {
    console.log('Adding new game')
    console.log(BASE_URL)
    const response = await fetch(`${BASE_URL}/api/developers`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput.value,
            country: countryInput.value,
            founded: dateInput.value
        })
    })
    if (response.status === 201) {
        toastLive.classList.remove('text-bg-danger')
        toastLive.classList.add('text-bg-success')
        liveToastMessage.innerText = 'Developer added successfully'
        toastBootstrap.show()
        console.log(response)
        form.reset()
        datePicker.setDate(new Date());
    } else {
        toastLive.classList.remove('text-bg-success')
        toastLive.classList.add('text-bg-danger')
        if (response.status === 400) {
            const data = await response.json();
            console.log(data)
            // liveToastMessage.innerText = data.message
            liveToastMessage.innerText = data.fieldErrors[0].defaultMessage
        } else {
            liveToastMessage.innerText = 'Something went wrong'
        }
        toastBootstrap.show()
    }
}

// Get Countries for select list
async function setCountryList(){
    await fetch('/api/developers/countries', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            // const selectCountry = document.getElementById('select-country');
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.text = country;
                option.id = country;
                // console.log(country);
                // if (country === 'United States') {
                //     option.selected = true;
                // }
                countryInput.appendChild(option);
            });
        });
}

async function getDevelopers() {
    const response = await fetch(`${BASE_URL}/api/developers`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    
    if (response.status === 200) {
        const data = await response.json()
        console.log(data)
    } else {
        console.log('Something went wrong..')
    }
}

// addButton.addEventListener('click',
//     (event) => event.preventDefault() || addNewGame())
form.addEventListener('submit', (event) => event.preventDefault() || addNewGame())
// form.addEventListener('submit', (event) => event.preventDefault() || getDevelopers())

// Run on window load
window.addEventListener('load', () => setCountryList(), createDatePicker());
