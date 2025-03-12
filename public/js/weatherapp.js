export class WeatherApp {
    constructor() {
        this.weatherInfoSection = document.querySelector('.weather-info')
        this.notFoundSection = document.querySelector('.not-found')
        this.searchCitySection = document.querySelector('.search-city')
        this.countryTxt = document.querySelector('.country-txt')
        this.tempTxt = document.querySelector('.temp-txt')
        this.conditionTxt = document.querySelector('.condition-txt')
        this.humidityValueTxt = document.querySelector('.humidity-value-txt')
        this.windValueTxt = document.querySelector('.wind-value-txt')
        this.weatherSummaryImg = document.querySelector('.weather-summary-img')
        this.currentDateTxt = document.querySelector('.current-date-txt')
        this.apiKey = '58adc3c83c341945334bfae70849a2ba';

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
                <img src="/recursos/${this.getWeatherIcon(id)}" class="forecast-item-img">
                <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
            </div>
        `
    
        this.forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem)
    
    }

    showDisplaySection(section) {
        [this.weatherInfoSection, this.searchCitySection, this.notFoundSection].forEach(section => section.style.display = 'none')
    
        section.style.display = 'flex';
    
    }

    async getFetchData(endPoint, city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${this.apiKey}&units=metric`

        const response = await fetch(apiUrl)

        return response.json()
    }

    async updateWeatherInfo(city) {
        const weatherData = await this.getFetchData('weather', city);

        if (weatherData.cod != 200) {
            this.showDisplaySection(this.notFoundSection)
            return
        }

        console.log(weatherData)

        const {
            name: country,
            main: { temp, humidity },
            weather: [{ id, main }],
            wind: {speed}

        } = weatherData

        this.countryTxt.textContent = country
        this.tempTxt.textContent = Math.round(temp) + ' °C'
        this.conditionTxt.textContent = main
        this.humidityValueTxt.textContent = humidity + '%'
        this.windValueTxt.textContent = speed + 'M/s'

        this.currentDateTxt.textContent = this.getCurrentDate()
        this.weatherSummaryImg.src = `/recursos/${this.getWeatherIcon(id)}`

        await this.updateForecastsInfo(city)
        this.showDisplaySection(this.weatherInfoSection);

    }

    async updateForecastsInfo(city){
        const forecastData = await this.getFetchData('forecast', city)

        const timeTaken = '12:00:00'
        const todayDate = new Date().toISOString().split('T')[0]


        this.forecastItemsContainer.innerHTML = ''


        forecastData.list.forEach(forecastWeather => {
            if (forecastWeather.dt_txt.includes(timeTaken) && !forecastWeather.dt_txt.includes(todayDate)){
                this.updateForecastsItems(forecastWeather)
            }
            
        })
        
    }
}