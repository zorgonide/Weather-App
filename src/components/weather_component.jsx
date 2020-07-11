import React from 'react'

function weather_cmponent(props) {
    return (
        <div className="container">
            <div className="cards pt-4">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.weatherIcon} display-1`}></i>
                </h5>
                {props.temp_celsius ? (<h1 className="py-2">{props.temp_celsius}&deg;</h1>) : null}
                {props.temp_celsius ? minmaxTemp(props.temp_min, props.temp_max): null}
                <h4 className="py-2">{props.description}</h4>
            </div>
        </div>
    )
}
function minmaxTemp(min, max){
    return(
        <h3>
            <span className="py-4 px-2">{min}&deg;</span><small>min</small>
            <span className="py-4 px-2">{max}&deg;</span><small>max</small>
        </h3>
    )
}


export default weather_cmponent;

