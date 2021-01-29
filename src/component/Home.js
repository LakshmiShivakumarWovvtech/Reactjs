import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
// import {Link} from 'react-router';


const Home=()=> {
    const [input , setInput] = useState();
    const [id , setId] = useState([]);
    const [details, setDetails]= useState(null);
    const [result, setResult] = useState(false);
    const [loading, setLoading] = useState(false);

   const handleChange = (event) => {
        setInput(event.target.value);
    }

    const astroidId = async() => {
        setLoading(true)
        try {
    const response = await axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=nUfYg5yZvl0L8dh7mbhxo5ngLk7rzGzkmUSigjJr',
    );
    setId(response.data.near_earth_objects)
    setLoading(false)
    console.log('data', response.data.near_earth_objects);
}
catch (error){
    console.log('error', error);
}
    }

    const detailsId = async () => {
       
        try{
            const response = await axios.get(
                `https://api.nasa.gov/neo/rest/v1/neo/${input}?api_key=nUfYg5yZvl0L8dh7mbhxo5ngLk7rzGzkmUSigjJr`,
              );
              setDetails(response.data);
              setResult(true)
              console.log('deatils', response.data.name);
        }
        catch(error){
            console.log('error', error);
        }
    }
    return (
        <div style={{padding: 20}}>
             <div>
            <input placeholder="Astroid Id" style={{width: 300, height: 30, marginBottom: 20}}  value={input} onChange={handleChange}  />
            </div>
       
          <div>

          <Button variant="contained" color="secondary" style={{width: 305,marginBottom: 20}}  disabled={!input ? true : false} onClick={()=>detailsId()}>
       Submit
      </Button>
   <div>
   <Button variant="contained" color="secondary" style={{width:305}} onClick={()=>astroidId()}>
       Random AstroidId
      </Button>
      </div>
   </div>
   {result ? 
   <div style={{marginTop: 30}} >
    
      
           <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
               <text style={{fontWeight:'bold'}}>Name :</text>
          <text>
      {details ? details.name ? details.name : 'not found' : 'not found'}
          </text>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
               <text style={{fontWeight:'bold'}}>nasa_jpl_url :</text>
          <text>
      {details ? details.nasa_jpl_url ? details.nasa_jpl_url : 'not found' : 'not found'}
          </text>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
               <text style={{fontWeight:'bold'}}>is_potentially_hazardous_asteroid :</text>
          <text>
      {details ? details.is_potentially_hazardous_asteroid.toString() ? details.is_potentially_hazardous_asteroid.toString() : 'not found' : 'not found'}
          </text>
         
          </div>
         
          </div>
         :  loading ? <CircularProgress color="secondary" style={{marginTop: 20}}/> :
         <div>
      {id && id.map((item)=>{
          return(
          <div onClick={()=>{setInput(item.id); detailsId();}}>
             
              <text >{item.id}</text>
             
              </div>
              );
      })}
      
    </div>
    }
                 </div>
    )
}
export default  Home;