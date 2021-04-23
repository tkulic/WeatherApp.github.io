// Weather icon

export const icon = (weatherData) => {
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

// Temperature

export const displayTempCelsius = (weatherData) => {
    const celsius = `${Math.round(weatherData.main.temp)}°C`
    const celsiusFeelsLike = `${Math.round(weatherData.main.feels_like)}°C`
    return [celsius, celsiusFeelsLike]
}

export const displayTempFahrenheit = (weatherData) => {
    const fahrenheit = `${Math.round(weatherData.main.temp * 9 / 5 + 32)} °F`
    const fahrenheitFeelsLike = `${Math.round(weatherData.main.feels_like * 9 / 5 + 32)} °F`
    return [fahrenheit, fahrenheitFeelsLike]
}