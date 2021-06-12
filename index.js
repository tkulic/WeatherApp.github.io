import { getIcon, displayCelsius, displayFahrenheit, getCurrentTime } from "./utils.js"

let weatherData
const API_ENDPOINT = "https://weather-proxy.freecodecamp.rocks/"

const status = document.getElementById("status")
const main = document.getElementById("main")
const title = document.getElementById("title")
const time = document.getElementById("time")
const icon = document.getElementById("icon")
const desc = document.getElementById("desc")
const temp = document.getElementById("temp")
const fineprintTemp = document.getElementById("fineprint-temp")
const pressure = document.getElementById("pressure")
const humidity = document.getElementById("humidity")
const wind = document.getElementById("wind")

function updateOverview(weatherData) {
    title.textContent = weatherData.name + ", " + weatherData.sys.country
    time.textContent = getCurrentTime()
    icon.textContent = getIcon(weatherData.weather[0].main)
    desc.textContent = weatherData.weather[0].description
    temp.textContent = displayCelsius(weatherData)[0]
    fineprintTemp.textContent = displayCelsius(weatherData)[1]
    pressure.textContent = weatherData.main.pressure + " hPa"
    humidity.textContent = weatherData.main.humidity + " %"
    wind.textContent = weatherData.wind.speed + " m/s"
}

async function getWeather(url) {
    const res = await fetch(url)
    const data = await res.json()
    weatherData = data

    main.classList.remove("hidden")
    updateOverview(data)
    status.textContent = ""
}

function retrieved(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude

    const route = `api/current?lon=${lon}&lat=${lat}`
    getWeather(API_ENDPOINT + route)
}

function failed() {
    status.textContent = "In order to display weather, access to your location must be granted."
}

if (navigator.geolocation) {
    status.textContent = "Locating..."
    navigator.geolocation.getCurrentPosition(retrieved, failed)
}



/////////////
// OPTIONS //
/////////////

// Options menu toggle

const optionsOpen = document.getElementById("options-open")
const optionsClose = document.getElementById("options-close")
const options = document.querySelector(".options")

optionsOpen.addEventListener("click", () => {
    options.classList.add("options-open")
})

optionsClose.addEventListener("click", () => {
    options.classList.remove("options-open")
})

// dark mode

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

// switch temperature unit

const celsiusBtn = document.getElementById("celsius")
const fahrenheitBtn = document.getElementById("fahrenheit")

celsiusBtn.addEventListener("click", () => {
    celsiusBtn.classList.add("option-active")
    fahrenheitBtn.classList.remove("option-active")
    temp.textContent = displayCelsius(weatherData)[0]
    fineprintTemp.textContent = displayCelsius(weatherData)[1]
})

fahrenheitBtn.addEventListener("click", () => {
    fahrenheitBtn.classList.add("option-active")
    celsiusBtn.classList.remove("option-active")
    temp.textContent = displayFahrenheit(weatherData)[0]
    fineprintTemp.textContent = displayFahrenheit(weatherData)[1]
})