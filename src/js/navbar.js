const sectionIds = ['section-search-developers', 'section-new-developer']

const linkSearchDevelopers = document.getElementById('link-search-developers')
const linkNewDeveloper = document.getElementById('link-new-developer')

linkSearchDevelopers.addEventListener('click', (event) =>
    event.preventDefault() || enableTab(sectionIds[0]))
linkNewDeveloper.addEventListener('click', (event) =>
    event.preventDefault() || enableTab(sectionIds[1]))

function enableTab(sectionId) {
    const allSections = document.querySelectorAll('body > section')
    for (const section of allSections) {
        if (section.id === sectionId) {
            section.style.display = 'block'
        } else {
            section.style.display = 'none'
        }
    }
}

