import React from 'react'
import { FadeTransform } from 'react-animation-components';

function weather_component(props) {
    return (
        <div className="container">
            <div className="cards pt-4" className="fade-in">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                    <i id="img"className={`wi ${props.weatherIcon} display-1`}></i>
                </h5>
                {props.temp_celsius ? (<FadeTransform in transformProps={{exitTransform: 'scale(1) translateY(-50%)' }}><h1 className="py-2">{props.temp_celsius}&deg;</h1></FadeTransform>) : null}
                {props.temp_celsius ? minmaxTemp(props.temp_min, props.temp_max): null}
                <h3 className="py-2">{props.description}</h3>
            </div>
        </div>
    )
}
function minmaxTemp(min, max){
    return(
        <FadeTransform in transformProps={{exitTransform: 'scale(1) translateX(-10%)' }}><h3>
            <span className="py-4 px-2">{min}&deg;</span><i><small>min</small></i>
            <span className="py-4 px-2">{max}&deg;</span><i><small>max</small></i>
        </h3>
        </FadeTransform>
    )
}


export default weather_component;

