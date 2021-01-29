import React from 'react';

export default class Details extends React.Component{

    constructor(props){
      super(props);

      this.state= {
        
      }
    }

    render(){
        console.log("details",JSON.stringify(this.props.details))
        return(
            <div>

              <text>{JSON.stringify(this.props.details)}</text>

            </div>
        )
    }
}