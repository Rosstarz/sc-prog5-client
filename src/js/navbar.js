const sectionIds = ['section-search-issues', 'section-new-developer']

const linkSearchIssues = document.getElementById('link-search-issues')
const linkNewIssue = document.getElementById('link-new-issue')

/**
 * Call this function with, i.e., the value "section-search-issues".
 * @param {string} sectionId
 */
function enableTab(sectionId) {
    const allSections = document.querySelectorAll('body > section')
    for (const section of allSections) {
        if (section.id === sectionId) {
            section.style.display = 'block'
            // TODO active class ? enable or disable
        } else {
            section.style.display = 'none'
            // TODO active class ? enable or disable
        }
    }
}

linkSearchIssues.addEventListener('click', (event) =>
    event.preventDefault() || enableTab(sectionIds[0]))
linkNewIssue.addEventListener('click', (event) =>
    event.preventDefault() || enableTab(sectionIds[1]))
