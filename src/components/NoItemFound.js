import * as React from 'react'
const NoItemFound=()=>{
    return <div className="padding w-f" style={{minHeight:'400px',paddingTop:150}}>
    <center>
        <img src={`${process.env.PUBLIC_URL}/icons/icons.png`} height="50" width="50"/>
        <h5>No data</h5>
        <p style={{fontSize:10}}>no data found</p>
    </center>

    </div>
}
export default NoItemFound