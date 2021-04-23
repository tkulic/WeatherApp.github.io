const status = document.getElementById("status")
const display = document.getElementById("display")

// Retrieve location

function retrieved(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    status.innerText = ""
    url = `https://weather-proxy.freecodecamp.rocks/api/current?lon=${lon}&lat=${lat}`
    getWeather(url)
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
    // console.time("fetching weather data")
    const res = await fetch(url)
    const data = await res.json()
    // console.timeEnd("fetching weather data")
    // Current time

    const time = new Date()
    const hours = time.getHours()
    const minutes = time.getMinutes()

    // Weater icon

    const icon = () => {
        switch (data.weather[0].main) {
            case "Clear":
                return "☀️"
                break
            case "Clouds":
                return "☁️"
                break
            case "Rain":
                return "☔️"
                break
            case "Snow":
                return "☃️"
                break
            default:
                return "🌍"
                break
        }
    }

    // Temperature


    const displayTempCelsius = () => {
        const celsius = `${Math.round(data.main.temp)}°C`
        const celsiusFeelsLike = `${Math.round(data.main.feels_like)}°C`
        return [celsius, celsiusFeelsLike]
    }

    const displayTempFahrenheit = () => {
        const fahrenheit = `${Math.round(data.main.temp * 9 / 5 + 32)} °F`
        const fahrenheitFeelsLike = `${Math.round(data.main.feels_like * 9 / 5 + 32)} °F`
        return [fahrenheit, fahrenheitFeelsLike]
    }


    display.innerHTML = `
        <div class="overwiew">
            <p class="title">${data.name}, ${data.sys.country}<p>
            <p class="time">${hours}:${minutes < 10 ? 0 : ""}${minutes} <p>
            <p class="icon">${icon()}</p>
            <p class="desc">${data.weather[0].description}<p>
        </div>

        <div class="details">
            <ul>
                <li id="temp">Temperature<hr />${displayTempCelsius()[0]} <span class="fineprint">/${displayTempCelsius()[1]}</span></li>
                <li>Pressure<hr />${data.main.pressure} hPa</li>
                <li>Humidity<hr />${data.main.humidity}%</li>
                <li>Wind<hr />${data.wind.speed}m/s</li>
            </ul>
        </div>
        `

    // Switch temperature

    const tempDisplay = document.getElementById("temp")
    const celsiusBtn = document.getElementById("celsius")
    const fahrenheitBtn = document.getElementById("fahrenheit")

    celsiusBtn.addEventListener("click", () => {
        celsiusBtn.classList.add("option-active")
        fahrenheitBtn.classList.remove("option-active")
        tempDisplay.innerHTML = `Temperature<hr />${displayTempCelsius()[0]} <span class="fineprint">/${displayTempCelsius()[1]}</span>`
    })

    fahrenheitBtn.addEventListener("click", () => {
        fahrenheitBtn.classList.add("option-active")
        celsiusBtn.classList.remove("option-active")
        tempDisplay.innerHTML = `Temperature<hr />${displayTempFahrenheit()[0]} <span class="fineprint">/${displayTempFahrenheit()[1]}</span>`
    })

}

// Options

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