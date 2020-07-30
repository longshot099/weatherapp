import React from 'react'

function WeatherDes({}, ref){
    return(
        <div className = 'weather'>
            <h3 id = 'weather-description' ref = {ref}></h3>
        </div>
    )
}

const forwardWeatherDes = React.forwardRef(WeatherDes)

export default forwardWeatherDes
