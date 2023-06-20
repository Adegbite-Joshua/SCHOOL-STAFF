import React , {useState, useEffect}from 'react'
import ReceiverMessages from './ReceiverMessages'
import SenderMessages from './SenderMessages'
import { useSelector } from 'react-redux' 
import axios from 'axios'
// import StaffMessages from './StaffMessages'

const MessageMainDiv = ({mainindex, category, email}) => {
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  let allStudents = useSelector((state)=>state.staffInformation.allStudents)
  let allStaffs = useSelector((state)=>state.staffInformation.allStaffs)
  // const [staffMessages, setstaffMessages] = useState()
  let staffMessages = useSelector((state)=>state.staffInformation.staffInformation).messages
  const [receiverName, setreceiverName] = useState('Select A Name')
  // const [category, setcategory] = useState('');
  // const [mainindex, setmainindex] = useState('');
  // const [index, setindex] = useState('');
  console.log(allStudents);
  const sendMessage = async()=>{
    let sendMessageEndpoint = 'http://localhost:7777/staff/message'
    let messageBody = {
      messageSenderClass: staffInfo.class,
      messageSenderEmail: staffInfo.email,
      receiverRelationship: mainindex==1?'staff':'student',
      receiverClass: category,
      receiverEmail: email,
      senderRelationship: 'staff',
      messageBody: document.getElementById('message').value
    }
    console.log(messageBody);
    try {
      const response = await axios.post(sendMessageEndpoint, messageBody)
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }
  const showReceiverName =()=>{
    if (mainindex==0) {
      if (email) {
        let receiver = allStudents[category].find((student)=>student.email==email)
        setreceiverName(`${receiver.firstName} ${receiver.lastName}`)
      } else{
        setreceiverName('Select A Name')
      }
    } else if (mainindex==1){
      if (email) {
        let receiver = allStaffs[category].find((staff)=>staff.email==email)
        setreceiverName(`${receiver.firstName} ${receiver.lastName}`)
      } else{
        setreceiverName('Select A Name')
      }
    }
  }
  useEffect(() => {
    // setstaffMessages(staffInfo.messages)
    showReceiverName()
  }, [email])
  
  return (
    <>
        <div className='MessageMainDiv mt-16 md:mt-0 h-5/6 md:h-full basis-full md:basis-8/12 px-5 overflow-y-auto border-2 border-green-500'>
            <div className='w-full h-full bg-white overflow-y-auto p-2'>
                <div className=' h-5/6 overflow-y-auto border border-3 border-blue-400'>
                  {staffMessages.length>0?<>
                  {staffMessages.map((message)=>(
                    <ReceiverMessages message='Hello. How are you today?' date='10:00 PM' src='vite.svg'/>
                  ))}
                  </>:<><SenderMessages message={`Hello ${staffInfo.firstName} ${staffInfo.lastName},  you do not have any message yet`} date={new Date().toLocaleTimeString()} src='vite.svg'/></>} 
                </div>
                <div className=' h-1/6 w-full'>
                  <h3 className=' text-center font-bold'>{receiverName}</h3>
                  <d className="flex">
                    <textarea name="" id="message" className=' w-full border border-3 border-red-400' rows="2"></textarea>
                    <button onClick={sendMessage} className=' p-2 rounded-md bg-blue-500 hover:bg-blue-400 block mx-auto'>Send Message</button>
                  </d>
                </div>
            </div>
        </div>
    </>
  )
}

export default MessageMainDiv