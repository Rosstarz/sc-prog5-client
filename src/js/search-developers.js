import {BASE_URL} from './constants.js'
import { Toast } from 'bootstrap'

/**
 * @type {HTMLFormElement}
 */
const searchForm = document.getElementById('search-form')
/**
 * @type {HTMLInputElement}
 */
const searchInput = document.getElementById('search-term')
/**
 * @type {HTMLButtonElement}
 */
const searchButton = document.getElementById('search-button')
/**
 * @type {HTMLTableSectionElement}
 */
const searchResults = document.getElementById('search-results')
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


async function searchDevelopers() {
    const searchTerm = searchInput.value
    const response = await fetch(`${BASE_URL}/api/developers?search=${searchTerm}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    searchResults.innerHTML = ''
    if (response.status === 200) {
        const developers = await response.json()
        showResults(developers)
    } else {
        toastLive.classList.remove('text-bg-success')
        toastLive.classList.add('text-bg-danger')
        if (response.status === 204) {
            liveToastMessage.innerText = 'No developers found'
        } else {
            liveToastMessage.innerText = 'Something went wrong'
        }
        toastBootstrap.show()
    }
}

/**
 * @param {[{name: string, country: string, founded: Date}]} developers
 */
function showResults(developers) {
    for (const developer of developers) {
        searchResults.innerHTML += `
            <tr>
                <td>${developer.name}</td>
                <td>${developer.country}</td>
                <td>${developer.founded}</td>
            </tr>
        `
    }
}

function inputEntered() {
    if (searchInput.value.length >= 3) {
        searchDevelopers()
    }
}

/**
 * @param {Event} event
 */
function submitForm(event) {
    event.preventDefault()
    searchDevelopers()
}

searchButton.addEventListener('click', submitForm)
searchInput.addEventListener('input', inputEntered)
searchForm.addEventListener('submit', submitForm)
