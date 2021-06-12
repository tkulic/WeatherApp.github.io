export function getCurrentTime() {
    const time = new Date()
    const hours = time.getHours()
    const minutes = time.getMinutes()
    return `${hours}:${minutes < 10 ? 0 : ""}${minutes}`
}

export function getIcon(weatherData) {
    switch (weatherData) {
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

// temperature unit converters

export function displayCelsius(weatherData) {
    const celsius = `${Math.round(weatherData.main.temp)}°C`
    const celsiusFeelsLike = `${Math.round(weatherData.main.feels_like)}°C`
    return [celsius, celsiusFeelsLike]
}

export function displayFahrenheit(weatherData) {
    const fahrenheit = `${Math.round(weatherData.main.temp * 9 / 5 + 32)} °F`
    const fahrenheitFeelsLike = `${Math.round(weatherData.main.feels_like * 9 / 5 + 32)} °F`
    return [fahrenheit, fahrenheitFeelsLike]
}