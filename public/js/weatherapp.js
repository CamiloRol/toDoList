class WeatherApp {
    constructor(searchBtn) {
        this.searchBtn = searchBtn
        this.weatherInfoSection = document.querySelector('.weather-info')
        this.notFoundSection = document.querySelector('.not-found')
        this.searchCitySection = document.querySelector('.search-city')

        this.forecastItemsContainer = document.querySelector('.forecast-items-container')
    }

    getWeatherIcon(id){
        if(id < 232) return 'thunderstorm.svg'
        if(id < 321) return 'drizzle.svg'
        if(id < 531) return 'rain.svg'
        if(id < 622) return 'snow.svg'
        if(id < 781) return 'atmosphere.svg'
        if(id < 800) return 'clear.svg'
        else return 'clouds.svg'
    }

    getCurrentDate() {
        const currentDate = new Date()
        const options = {
            weekday: 'short',
            day: '2-digit',
            month: 'short'
        }
        return currentDate.toLocaleDateString('en-GB', options)
    }

    updateForecastsItems(weatherData){
        const {
            dt_txt: date,
            weather: [{ id }],
            main: { temp }
        } = weatherData
    
        const dateTaken = new Date(date)
        const dateOption = {
            day: '2-digit',
            month: 'short',
        }
    
        const dateResult = dateTaken.toLocaleDateString('en-US',dateOption)
    
        const forecastItem = `
            <div class="forecast-item">
                <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
                <img src="./assets/weather/${getWeatherIcon(id)}" class="forecast-item-img">
                <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
            </div>
        `
    
        forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem)
    
    }

    showDisplaySection(section) {
        [this.weatherInfoSection, searchCitySection, notFoundSection].forEach(section => section.style.display = 'none')
    
        section.style.display = 'flex';
    
    }
}

export default WeatherApp;