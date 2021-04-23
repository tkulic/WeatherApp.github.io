const optionsOpen = document.getElementById("options-open")
const optionsClose = document.getElementById("options-close")
const options = document.querySelector(".options")

optionsOpen.addEventListener("click", () => {
    options.classList.add("options-open")
})

optionsClose.addEventListener("click", () => {
    options.classList.remove("options-open")
})

// Dark mode

const darkModeEnable = document.getElementById("dark-mode-enable")
const darkModeDisable = document.getElementById("dark-mode-disable")

darkModeEnable.addEventListener("click", () => {
    darkModeEnable.classList.add("option-active")
    darkModeDisable.classList.remove("option-active")
    document.body.classList.add("dark-mode")
})

darkModeDisable.addEventListener("click", () => {
    darkModeDisable.classList.add("option-active")
    darkModeEnable.classList.remove("option-active")
    document.body.classList.remove("dark-mode")
})