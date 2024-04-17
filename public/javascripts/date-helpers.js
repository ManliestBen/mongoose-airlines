const dateInputEl = document.getElementById('departs-input')

let offset = new Date().getTimezoneOffset() * 60000
let oneYearFromNow = new Date().setFullYear(new Date().getFullYear() + 1)
let localISOTime = new Date(oneYearFromNow - offset).toISOString().slice(0, 16)

window.addEventListener('load', function() {
  dateInputEl.value = localISOTime
})