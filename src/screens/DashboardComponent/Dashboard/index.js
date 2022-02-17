import * as React from 'react';
import { Button, ButtonGroup, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { colors } from '../../../styles';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts'
import {Link} from 'react-router-dom'
const DashBoardTab=(params)=>{
    const [series,setSeries]=React.useState([{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
      }])
      const [options,setOptions]=React.useState({
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false,
          style: {
            colors: ['#F44336', '#E91E63', '#9C27B0']
          }
        },
        fill:{
          colors: ['#5E7698','#EFF6FF']
        },
        stroke: {
          curve: 'smooth',
          colors:['#0C2446']
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
        markers: {
          colors: ['#0C2446']
       }
       
      })
    
      
    return (
        <div>
           <div className="f-flex "  style={{justifyContent:'right',backgroundColor:'#efefef',padding:7,borderRadius:10}}>
               <div className='f-flex  mrit' style={{backgroundColor:'white'}}>
                   <ToggleButtonGroup value={'month'} variant={'contained'} style={{boxShadow:'0 0 0 #00000000'}}>
                       <ToggleButton value="week" disableElevation>Week</ToggleButton>
                       <ToggleButton value="month" disableElevation>Month</ToggleButton>
                       <ToggleButton value="year" disableElevation>Year</ToggleButton>
                   </ToggleButtonGroup>
               </div>
               <TextField type='date' style={{backgroundColor:'white'}} />
           </div>
           <div className="f-flex padding w-f" style={{justifyContent:'space-between'}}>
               <div className="w-20 border padding" style={{borderRadius:5}}>
               <center>
               <Typography variant="p" color={colors.primary5} className=" j-c">
               <b>Total users</b>
                </Typography>
                   <Typography variant="h3" color={colors.primary10}>
                   132,123
                   </Typography>
               </center>
              
               </div>
               <div className="w-20 border padding" style={{borderRadius:5}}>
               <center>
               <Typography variant="p" color={colors.primary5} className=" j-c">
               <b>Active</b>
                </Typography>
                   <Typography variant="h3" color={colors.primary10}>
                   132,123
                   </Typography>
               </center>
              
               </div>
               <div className="w-20 border padding" style={{borderRadius:5}}>
               <center>
               <Typography variant="p" color={colors.primary5} className=" j-c">
               <b>Inactive</b>
                </Typography>
                   <Typography variant="h3" color={colors.primary10}>
                   132,123
                   </Typography>
               </center>
              
               </div>
               <Link to="/home/membership" className='w-20 border padding'>
               <div className="" style={{borderRadius:5}}>
               <center>
               <Typography variant="p" color={colors.primary5} className=" j-c">
               <b>Premium</b>
                </Typography>
                   <Typography variant="h3" color={colors.primary10}>
                   132,123
                   </Typography>
               </center>
              
               </div>
               </Link>


               
           </div>
           <div className='w-f padding' >
               <Chart options={options} series={series} height={300} type={'area'}/>
           </div>
        </div>
    )
}
export default DashBoardTab;

