import React , {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardMainDiv from './DashboardMainDiv'
import DashboardNav from './DashboardNav'
import DashboardOtherSide from './DashboardOtherSide'
import {useSelector, useDispatch} from 'react-redux'
import {fetchStaff, setFetching} from '../../redux/staffInformation'
import axios from 'axios'
import Loader from '../../Loader'
import SnackBar from '../SnackBar'

// import {Redirect} from 'react-router-dom'



const StaffDashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  let fetching = useSelector((state)=>state.staffInformation.staffFetchingState)
  const [snacksBarBody, setsnacksBarBody] = useState('')
  const [snacksBarType, setsnacksBarType] = useState('info')
  
  const fetchStaffInformation = ()=>{
    if (Object.keys(staffInfo).length === 0 && staffInfo.constructor === Object) {
      let endpoint = 'http://localhost:7777/staff/dashboard'
      let token = localStorage.token
      axios.post(endpoint, {token})
      .then((res)=>{
          console.log(res)
          if (res.status==200) {
            dispatch(fetchStaff(res.data))
            dispatch(setFetching(false))
            console.log(`${staffInfo.pictureUrl.split('upload/')[0]}upload/r_max,q_50/${staffInfo.pictureUrl.split('upload/')[1]}`)
          } else if(res.status != 200){
              state.staffInformation = 'error'
          }
      })
      .catch((err)=>{
          console.log(err);
      })
    }
  }
  useEffect(() => {
    validateStaff()
  }, [])

  const showSnackBar = () => {
      // Get the snackbar DIV
      var x = document.getElementById("snackbarContainer");
      x.className = "show";
      setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 3000);
  }

  // https://res.cloudinary.com/dc9o9pwld/image/upload/q_50/cld-sample.jpg (quality)
  // https: r_max (rouded)
  const validateStaff =()=>{
    let token = localStorage.token
    let validateEndpoint = 'http://localhost:7777/staff/validatetoken'
    axios.get(validateEndpoint, {headers : {
      "Authorization": `Bearer ${token}`,
      "Content-Toe": "application/json",
      "Accept": "application/json"
    }})
    .then((res)=>{
      console.log(res);
      if (res.status == 200) {
        fetchStaffInformation()
      } else{
        setsnacksBarBody('Invalid Acesss Token')
        setsnacksBarType('error')
        showSnackBar()
        setTimeout(() => navigate('/signin'), 3000);
      }
    })
    .catch((error)=>{
      setsnacksBarBody('Invalid Acesss Token')
      setsnacksBarType('error')
      showSnackBar()
      setTimeout(() => navigate('/signin'), 3000);
      console.log(error);
    })
  }

  let values = useParams()
  return (
    <>
        <div className="flex w-screen flex-col md:flex-row bg-slate-300 relative ring-0">
            <DashboardNav/>
            {fetching && <Loader/>}
            {!fetching && <>
              <DashboardMainDiv name='' submittedTest={[]} topStudents={[]} groups={[]}/>
              <DashboardOtherSide/>
            </>}
        </div>
        <div id='snackbarContainer'><SnackBar body={snacksBarBody} type={snacksBarType}/></div>
    </>
  )
}

export default StaffDashboard