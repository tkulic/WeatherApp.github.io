import { icon, displayTempCelsius, displayTempFahrenheit } from "./utils.js"
import "./options.js"

const status = document.getElementById("status")
const display = document.getElementById("display")

// Retrieve location

function retrieved(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    getWeather(`https://weather-proxy.freecodecamp.rocks/api/current?lon=${lon}&lat=${lat}`)

    status.innerText = ""
}

function failed() {
    status.textContent = "In order to display weather, access to your location must be granted."
}

if (navigator.geolocation) {
    status.innerText = "Locating..."
    navigator.geolocation.getCurrentPosition(retrieved, failed)
}

// Main function //

async function getWeather(url) {
    const res = await fetch(url)
    const data = await res.json()

    // Current time

    const time = new Date()
    const hours = time.getHours()
    const minutes = time.getMinutes()

    display.innerHTML = `
        <div class="overwiew">
            <p class="title">${data.name}, ${data.sys.country}<p>
            <p class="time">${hours}:${minutes < 10 ? 0 : ""}${minutes} <p>
            <p class="icon">${icon(data.weather[0].main)}</p>
            <p class="desc">${data.weather[0].description}<p>
        </div>

        <div class="details">
            <ul>
                <li id="temp">Temperature<hr />${displayTempCelsius(data)[0]} <span class="fineprint">/${displayTempCelsius(data)[1]}</span></li>
                <li>Pressure<hr />${data.main.pressure} hPa</li>
                <li>Humidity<hr />${data.main.humidity}%</li>
                <li>Wind<hr />${data.wind.speed}m/s</li>
            </ul>
        </div>
        `

    // Switch temperature unit

    const tempDisplay = document.getElementById("temp")
    const celsiusBtn = document.getElementById("celsius")
    const fahrenheitBtn = document.getElementById("fahrenheit")

    celsiusBtn.addEventListener("click", () => {
        celsiusBtn.classList.add("option-active")
        fahrenheitBtn.classList.remove("option-active")
        tempDisplay.innerHTML = `Temperature<hr />${displayTempCelsius(data)[0]} <span class="fineprint">/${displayTempCelsius(data)[1]}</span>`
    })

    fahrenheitBtn.addEventListener("click", () => {
        fahrenheitBtn.classList.add("option-active")
        celsiusBtn.classList.remove("option-active")
        tempDisplay.innerHTML = `Temperature<hr />${displayTempFahrenheit(data)[0]} <span class="fineprint">/${displayTempFahrenheit(data)[1]}</span>`
    })

}