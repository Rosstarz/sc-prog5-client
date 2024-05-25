import {BASE_URL} from './constants.js'

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

async function searchIssues() {
    const searchTerm = searchInput.value
    const response = await fetch(`${BASE_URL}/api/issues?search=${searchTerm}`,
        {
            headers: { Accept: 'application/json' }
        })
    searchResults.innerHTML = ''
    if (response.status === 200) {
        const issuesArray = await response.json()
        showResults(issuesArray)
    }
}

/**
 * @param {[{title: string, state: string}]} issues
 */
function showResults(issues) {
    for (const issue of issues) {
        searchResults.innerHTML += `
            <tr>
                <td>${issue.title}</td>
                <td>${issue.state}</td>
            </tr>
        `
    }
}

function inputEntered() {
    if (searchInput.value.length >= 3) {
        searchIssues()
    }
}

/**
 * @param {Event} event
 */
function submitForm(event) {
    event.preventDefault()
    searchIssues()
}

searchButton.addEventListener('click', submitForm)
searchInput.addEventListener('input', inputEntered)
searchForm.addEventListener('submit', submitForm)
