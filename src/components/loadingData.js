import * as React from 'react'

const LoadingData=()=>{
    return <div className="padding w-f" style={{minHeight:'400px',paddingTop:150}}>
    <center>
        <img src={`${process.env.PUBLIC_URL}/Walk.gif`} height="50" width="50"/>
        <h5>Loading data</h5>
        <p style={{fontSize:10}}>Loading data!please wait</p>
    </center>

    </div>
}
export default LoadingData