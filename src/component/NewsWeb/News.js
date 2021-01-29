/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect,useCallback} from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';

const News=()=> {
    // const [data, setData] = useState([])
    // const [filter, setFilter] = useState([])
    const [search, setSearch] = useState();
    const [list, setList] = useState({data: null});
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState({search: null});
    const [page, setPage] = useState(0);
    const [shouldFetch, setShouldFetch] = useState(true);


    const fetchMore = useCallback(() => setShouldFetch(true), []);
  useEffect(() => {
    if (!shouldFetch) {
      return;
    }
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`,
        );
        setShouldFetch(false);
        setList({...list, data: response.data.hits});
        console.log('bb', list.data, page);
        setPage(page + 1);
        setLoading(false);
      } catch (error) {}
    };
    getData();
  }, [page, list, shouldFetch, fetchMore, value.search]);

 
 
  const searchData = () => {
   
    for (let i = 0; i < list.data[i].length; i++) {
     
      if (list.data[i].title) {
        if (
          list.data[i].author.toLowerCase().includes(value.search) ||
          list.data[i].title.toLowerCase().includes(value.search) ||
          list.data[i].url
            ? list.data[i].url.toLowerCase().includes(value.search)
            : false
        ) {
          let arr = [];
          arr.push(list.data);
          console.log('qqq', arr);
          setSearch(arr);

        }
      }
    }
  };
 
 

  const filterByTitle = () => {
    const data = list.data;
    console.log('ee', data);
    data.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1,
    );
    setList({data: list});
    console.log('ascending', data);
    data.map((records) => setList({data: data}));
    // console.log('ascending', data);
  };
  const filterByCreatedDate = () => {
    const data = list.data;
    console.log('ee', data);
    data.sort((a, b) =>
      a.created_at.toLowerCase() > b.created_at.toLowerCase() ? 1 : -1,
    );
    setList({data: list});
    console.log('ascending', data);
    data.map((records) => setList({data: data}));
    // console.log('ascending', data);
  };

  const handleChange = (event) => {
    console.log('eent', event);
    if (event) {
      setValue({search: event.target.value});
    } else {
      setSearch(null);
      setValue(false);
    }
  };

//   const handleChange = (event) => {
//           setValue(event.target.value);
//      };

 
    // const pageData = async()=>{
    //     try {
    //     const response = await axios.get('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0')
    //     setData(response.data.hits)
    //     }
    //     catch (error){
    //         // console.log('error', error);
    //     }
    // }
    // useEffect(() => {
    //    pageData();
    //    setInterval(() => {
    //        pageData();
    //    }, 5000);
     
    // },)

    // const filterByTitle = () => {
    //     const filterData = data;
    //     console.log('ee', filterData);
    //     filterData.sort((a, b) =>
    //       a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1,
    //     );
    //     setFilter({data:filterData});
    //     console.log('ascending',filterData);
    //   }

    return (
        <div style={{padding: 20}}>
             <div>
            <div>
            <input placeholder="Search By Author, Title And Url " style={{width: 300, height: 40, marginBottom: 20}}  onChange={handleChange} />
            </div>
            <div>
          <Button variant="contained" color="secondary" style={{width: 305,marginBottom: 20}} disabled={!value? true : false } onClick={()=>  searchData()}>
       Submit
      </Button>
      <Button variant="contained" color="secondary" style={{width: 305,marginBottom: 20}} onClick={()=> filterByTitle()}>
       Filter by Title
      </Button>
      <Button variant="contained" color="secondary" style={{width: 305,marginBottom: 20}} onClick={()=>  filterByCreatedDate()}>
       Filter by Created_at
      </Button>
      </div>
            </div>
            <div>
           {list.data && list.data.map((item) => {
               return(
                   <div>
                        <div class="card" style={{width: 500,margin: '0 auto',
                  float: 'none',
                  marginBottom: '10px'}} >
                   <div class="card-body" >
                       <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                       <text style={{fontWeight:'bold'}}>Title: {''}</text>
                       <text onClick={()=>{JSON.stringify(item)}}>{item ? item.title ? item.title : 'nodata' : 'no data'}</text>
                       </div>
                       <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                       <text style={{fontWeight:'bold'}}>URL:  {''}</text>
                       <text>{item.url}</text>
                       </div>
                       <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                       <text style={{fontWeight:'bold'}}>Created_at : {''}</text>
                       <text>{item.created_at}</text>
                       </div>
                       <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                       <text style={{fontWeight:'bold'}}>Author : {''} </text>
                       <text>{item.author}</text>
                       </div>
                       </div>
                       </div>
                   </div>
               )
           })}
            </div>
        </div>
    )
}

export default News
