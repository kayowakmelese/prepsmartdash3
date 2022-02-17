import { CheckBox } from '@mui/icons-material';
import { Button, MenuItem, Modal, Select, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react'
import { colors } from '../../../styles';


const MemberShip = (params) => {
    const [modal, setModal] = React.useState(false);
    const rows = [
        {
            id: 1, type: 'Billing type', premium: 'One time', advance: 'Yearly', basic: 'monthly', enterprise: 'Yearly'
        }
        ,
        {
            id: 2, type: 'price', premium: '100$', advance: '200$', basic: '400$', enterprise: '500$'
        }

    ]
    const columns = [{
        field: 'type', headerName: 'Membership type',width:200
    },
    {
        field: 'premium', headerName: 'Premium',width:200
    },
    {
        field: 'advance', headerName: 'Advance',width:200
    }
        , {
        field: 'basic', headerName: 'Basic',width:200
    },
    {
        field: 'enterprise', headerName: 'Enterprise',width:200
    }

    ]
    return <div>
        <div className='f-flex padding' style={{ justifyContent: 'space-between' }}>
            <Typography variant="p" xs={{ alignSelf: 'center' }} >Membership</Typography>
            <Button variant={'contained'} disableElevation xs={{ color: 'white' }} onClick={()=>{setModal(true)}}>Add new</Button>
        </div>
        <div style={{ height: 300 }}>
            <DataGrid rows={rows} columns={columns} className="w-f" sx={{height: 300,border:1,borderColor:'#ccc','& .MuiDataGrid-cell':{
                borderBottom:1,borderColor:'#ccc'
            } }}
                pageSize={5}
                rowsPerPageOptions={[5]} />

        </div>
        <Modal open={modal}>
            <center>
                <div className="w-50  white padding" style={{ marginTop: '5%' }}>
                    <Typography variant="p" color={colors.primary9} className="t-left">
                        <b>Add New User</b>

                    </Typography>
                    <br />

                    <div className="t-left m-top f-flex">
                        <div className="w-50">
                            <p className=' t-l'>Membership Title</p>
                            <input type={'text'} placeholder='username' className='w-f' />
                            <p className=' t-l' >Billing type</p>
                            <input type={'email'} placeholder='email' className='w-f' />
                            <p className=' t-l'>Price</p>
                            <input type={'password'} placeholder='username' className='w-f' />
                            <p className=' t-l' >Access</p>
                            <input type={'password'} placeholder='password' className='w-f' />

                            <p className=' t-l' >Access date</p>
                            <div className="f-flex">
                                <input type="number" className="w-20"/>
                                <input type='date' className="w-f"/>
                            </div>
                            <p className=' t-l' >Status</p>
                            <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={20}
    label="Age"
    className="w-f"
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>

                        </div>
                        <div className="padding">
                            <p className='t-l'>Features</p>
                            {
                                [0,1,2,3,4].map((dat,i)=>{
                                    return <div className="f-flex b-bottom w-f">
                                        <CheckBox color={'primary'} checked/>
                                        <Typography variant="p">
                                            feature{i}
                                        </Typography>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <Button variant={'text'} className="mrit" onClick={() => setModal(false)}>Cancel</Button>
                    <Button variant={'contained'} disableElevation style={{ padding: '0 15%' }} style={{ backgroundColor: colors.primary10 }}>Save</Button>
                </div>
                </div>

              



            </center>
        </Modal>
    </div>
}
export default MemberShip;