import React from 'react'

function WeatherTemp({}, ref){
    return(
        <div className = 'weather'>
            <h3 id = 'temp' ref = {ref}></h3>
        </div>
    )
}

const forwardWeatherTemp = React.forwardRef(WeatherTemp)

export default forwardWeatherTemp
