import React from 'react';
import { Button,TextField } from '@material-ui/core';
import Details from './Details';


export default class NewsNew extends React.Component{

    constructor(props){
      super(props);

      this.state= {
        searchText:'',
        newsData:[],
        page:0,
        showSearchData:true,
        searchData:[],
        godetails:true,
        details:[],
        filterData:true,
        data:true,
        data1:[]
      }
    }

    componentDidMount(){
        ///this.setState({isloading:true})
          this.getData();
          setInterval(()=>{
              this.getData()
          },10000)
      }

      getData(){
        return fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page='+this.state.page)
        .then((response) => response.json())
        .then((responseJson)=>{
            this.setState({newsData: responseJson.hits})
            this.setState({isloading:false})
        })
        .catch((error)=>{
          console.log(error);
          this.data();
        })
    }

    data(){
        return(
            <div>
                <text>Not Found</text>
            </div>
        )
    }

    searchfilter(){
        
        const data = this.state.newsData
        for(let i=0;i<data.length;i++){
            if(data[i].url !== null && data[i].url !== undefined && data[i].url !== ""){
              if(data[i].author.toLowerCase().includes(this.state.searchText.toLowerCase())  || data[i].title.includes(this.state.searchText.toLowerCase())
                              || data[i].url.toLowerCase().includes(this.state.searchText.toLowerCase())
                          )
                          {
                            this.state.searchData.push(data[i])
                             console.log("true",JSON.stringify(this.state.searchData))
                             this.setState({showSearchData:false})

                          }
                          
                 }
        }

        
      } 


      searchbyDate=()=>{
        var sorted = this.state.newsData;
        sorted.sort((a,b)=>(a.created_at > b.created_at ? 1 : -1))
        this.setState({data1:sorted,data:false})
    }
    searchbyTitle=()=>{
      var sorted = this.state.newsData;
      sorted.sort((a,b)=>(a.title > b.title ? 1 : -1))
      this.setState({data1:sorted,data:false})
   }

      // searchfilter(text){
      //  // this.setState({EndReached:false})
      //    let searchData = this.state.newsData.filter((ele)=>{
      //        return(
      //            ele.author.toLowerCase().includes(text.toLowerCase()) ||
      //            ele.title.toLowerCase().includes(text.toLowerCase()) ||
      //            ele.url.toLowerCase().includes(text.toLowerCase())
      //        )
      //    })
      //    this.setState({newsData:searchData});
      //    if(!text){
      //        alert("Data Not Found");
      //    }
      // } 
   
  render(){
    return (
      <div style={{textAlign:'center',marginTop:50,}}>


      {this.state.godetails ?
          <div>
      
            <TextField onChange={(event)=>this.setState({searchText: event.target.value})} 
                      value={this.state.searchText} 
                      label="search by author or title"
                      variant="filled"
                      style={{width:'20%'}} />
    
            <div>
              <Button variant="contained" 
                      color="primary" 
                      style={style.button}
                      disabled={this.state.searchText.length <1 ? true : false}
                      onClick={()=> this.searchfilter()}
                      
                      >

                     Submit

                </Button>
                <Button variant="contained" 
                      color="primary" 
                      style={style.button}
                      onClick={()=> this.setState({filterData:false})}
                      
                      >

                     Filter

                </Button>
            </div>
        { this.state.filterData ?
              null
              :
            <div>
              <Button variant="contained" 
                      color="primary" 
                      style={style.button}
                      onClick={()=> this.searchbyDate()}
                      
                      >

                       Created_at

                </Button>
                <Button variant="contained" 
                      color="primary" 
                      style={style.button}
                        onClick={()=> this.searchbyTitle()}
                      
                      >
                           Title
                </Button>
            </div>
        }

        {this.state.data ?
            this.state.searchText.length <1 ?
            
                this.state.newsData.map((item, index) =>
                    
                  <div class="card" style={{width: '100rem',margin: '0 auto',marginTop:10,
                                                  float: 'none', marginBottom: '10px'}}
                                   onClick={()=> this.setState({godetails:false,details:item})} >
                
                        <div class="card-body">

                          <div style={style.inputDiv}>
                                <text style={style.labelText}>Author:- </text>
                                <text style={style.text}>{item.author}</text>
                            </div>

                            <div style={style.inputDiv}>
                                <text style={style.labelText}>Created_at:-  </text>
                                <text style={style.text}>{item.created_at}</text>
                            </div>

                            <div style={style.inputDiv}>
                                <text style={style.labelText}>Title:-  </text>
                                <text style={style.text}>{item.title}</text>
                            </div>

                            <div style={style.inputDiv}>
                                <text style={style.labelText}>Url:- </text>
                                <text style={style.text}>{item.url}</text>
                            </div>

                       </div>

                 </div>
                )
                :
             

                  this.state.searchData.map((item, index) =>
                      
                  <div class="card" style={{width: '100rem',margin: '0 auto',marginTop:10,
                                                  float: 'none', marginBottom: '10px'}}
                              onClick={()=> this.setState({godetails:false,details:item})}                     >
                  <div class="card-body">

                          <div style={style.inputDiv}>
                                <text style={style.labelText}>Author:- </text>
                                <text style={style.text}>{item.author}</text>
                            </div>

                            <div style={style.inputDiv}>
                                <text style={style.labelText}>Created_at:-  </text>
                                <text style={style.text}>{item.created_at}</text>
                            </div>

                            <div style={style.inputDiv}>
                                <text style={style.labelText}>Title:-  </text>
                                <text style={style.text}>{item.title}</text>
                            </div>


                            <div style={style.inputDiv}>
                                <text style={style.labelText}>Url:- </text>
                                <text style={style.text}>{item.url}</text>
                            </div>
                     </div>

                 </div>
                    
                    )
                   : this.state.data1.map((item, index) =>
                    
                    <div class="card" style={{width: '100rem',margin: '0 auto',marginTop:10,
                                                    float: 'none', marginBottom: '10px'}}
                                                    onClick={()=> this.setState({godetails:false,details:item})} >
                  
                          <div class="card-body">
  
                            <div style={style.inputDiv}>
                                  <text style={style.labelText}>Author:- </text>
                                  <text style={style.text}>{item.author}</text>
                              </div>
  
                              <div style={style.inputDiv}>
                                  <text style={style.labelText}>Created_at:-  </text>
                                  <text style={style.text}>{item.created_at}</text>
                              </div>
  
                              <div style={style.inputDiv}>
                                  <text style={style.labelText}>Title:-  </text>
                                  <text style={style.text}>{item.title}</text>
                              </div>
  
                              <div style={style.inputDiv}>
                                  <text style={style.labelText}>Url:- </text>
                                  <text style={style.text}>{item.url}</text>
                              </div>
  
                         </div>
  
                   </div>
                  )
                }
                </div>

                :
                <Details details={this.state.details}/>
      }
        
              
      </div>
    );
  }
}

const style={
  button:{
    margin:20,
    width:'10%',
    height:'25%',
    fontWeight:'bold',
    fontSize:'20'
  },
  inputDiv:{
    display: 'flex', 
    flexDirection: 'row',
     justifyContent: 'center'
  },
  labelText:{
    fontWeight:'bold',
    fontSize:20,
  },
  text:{
    fontSize:20
  }
}