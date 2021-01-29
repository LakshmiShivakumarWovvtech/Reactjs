import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import CapitalWeater from './CapitalWeater';

const CountryHome = () => {
    const [result, setResult] = useState()
    const [value, setValue] = useState()
    const [CapitalName, setCapitalName] = useState();
    const [details, setDetails] = useState(false)
    // const i = 0;
    // const icon = CapitalName.current.weather_icons[i];

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const submitContryName = async () => {
        try {
          const response = await axios.get(
            ` https://restcountries.eu/rest/v2/name/${value}`,
          );
          setResult(response.data);
          console.log('data', response.data)
                 } catch (error) {
          console.log('error', error);
        }
      };
      const submitCapitalName = async (item) => {
        try {
          const response = await axios.get(
            `http://api.weatherstack.com/current?access_key=4af3a27d0fa68425aef7d2bd748ddf21&QUERY=${item}`,
          );
          setCapitalName(response.data);
          console.log('data', response.data.current.precip)
          setDetails(true)
                 } catch (error) {
          console.log('error', error);
        }
      };
    return (
        <div style={{padding: 20}}>
          <div>
          
            {details ? 
             <div class="card" style={{width: '23rem',margin: '0 auto',
             float: 'none',
             marginBottom: '10px'}}>
              <div class="card-body">
             <div>
               <text style={{fontWeight:'bold', color: 'blue'}}>Name:</text>
           <text>{CapitalName ? CapitalName.location.name ? CapitalName.location.name : 'not found' : 'not found'}</text>
           </div>
           <div>
             <text style={{fontWeight:'bold', color: 'blue'}}>Wind_Speed:</text>
             <text>{CapitalName ? CapitalName.current.wind_speed ? CapitalName.current.wind_speed : 'not found' : 'not found'}</text>
           </div>
           <div>
             <text style={{fontWeight:'bold', color: 'blue'}}>Temperature:</text>
             <text>{CapitalName ? CapitalName.current.temperature ? CapitalName.current.temperature : 'not found' : 'not found'}</text>
           </div>
           <div>
             <text style={{fontWeight:'bold', color: 'blue'}}>Precip:</text>
             <text>{CapitalName.current.precip}</text>
           </div>
           <div>
             <img src={CapitalName.current.weather_icons[0]} style={{width: 70, height: 40}} />
           </div>
           </div>
           </div>
         :
           <div>
               <div>
            <div>
            <input placeholder="Astroid Id" style={{width: 300, height: 40, marginBottom: 20}} value={value} onChange={handleChange}  />
            </div>
            <div>
          <Button variant="contained" color="secondary" style={{width: 305,marginBottom: 20}}  disabled={!value ? true : false} onClick={()=>submitContryName()}>
       Submit
      </Button>
      </div>
            </div>
            {result && result.map((item)=>{
              return(
                <div>
                  <div class="card" style={{width: '23rem',margin: '0 auto',
                  float: 'none',
                  marginBottom: '10px'}}>
                   <div class="card-body">
               <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                 <text style={{fontWeight:'bold', color: 'green'}}>Name:</text>
                <text>{item ? item.name ? item.name : 'not found' : 'not found'}</text>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                  <text style={{fontWeight:'bold', color: 'green'}}>Capital:</text>
                  <text>{item ? item.capital ? item.capital : 'not found' : 'not found'}</text>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                  <text style={{fontWeight:'bold', color: 'green'}}>population:</text>
                  <text>{item ? item.population ? item.population : 'not found' : 'not found'}</text>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                  <text style={{fontWeight:'bold', color: 'green'}}>population:</text>
                  <text>{item ? item.latlng ? item.latlng : 'not found' : 'not found'}</text>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <div>
                <img src={item.flag} alt="flag" style={{width:100, height: 80}} />
                  </div>
                  <div style={{marginTop: 20}}>
                  <Button variant="contained" color="primary" onClick={() => submitCapitalName(item.capital)}>
                      Capital Weather
                      </Button>
                  </div>
                  </div>
                </div>
                </div>
            </div>
              )
            })}
           </div>
              }
           </div>
        </div>
    )
}

export default CountryHome
