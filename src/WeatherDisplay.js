import './WeatherDisplay.css';

const WeatherDisplay = (props) => {
    const { temp, desc, name } = props;
    return(
        <div className='WeatherDisplay'>
            <h1>{temp}</h1>
            <p>{desc}</p>
            <small>{name}</small>
        </div>
    );
}


export default WeatherDisplay;