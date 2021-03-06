import React ,{useState,useEffect} from 'react';
import './Profile.css'
import {AiFillPhone,AiFillCreditCard} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"
import axios from "axios"

import { useStateValue } from './StateProvider';
import { Link, useHistory } from "react-router-dom";



function Profile() {
    var [customer,setCustomer]=useState([]);
    var [booking_details,setBookings]=useState([]);

    var customerUrl="http://localhost:8000/customer"

    const [{user_details}, dispatch] = useStateValue();
    

    var [edit_email,setEditEmail]=useState(user_details.cust_email);
    var [edit_password,setEditPassword]=useState(user_details.cust_password);
    
    var [edit_name,setEditName]=useState(user_details.cust_name);
    var [edit_phone,setEditPhone]=useState(user_details.cust_phone);
          

    console.log(user_details)
    useEffect(()=>{
        async function fetchCustomer(){
                var request = await axios.get(customerUrl);
               setCustomer(request.data)
            console.log(request.data)
            }

            fetchCustomer();
    },[customerUrl])
  

    var fetchbookings = "http://localhost:8000/reservations/1";

    useEffect(()=>{
   
        async function bookings(){
            var request = await axios.get(fetchbookings);
           setBookings(request.data)
        console.log(request.data)
        }
             
        bookings();
    },[fetchbookings])

    var history = useHistory()
    var [disable,setDisable] = useState(true)

    var editUrl = "http://localhost:8000/editcustomer"

     async function edit(){
        // setDisable(!disable);
        // var request = await axios.post(editUrl,{
        
        //     "username":edit_name,
        //     "useremail":edit_email,
        //     "phone":edit_phone,
        //     "password":edit_password,
        //     "custid":user_details.cust_id

          
        // });
      

    }
    return (

    
        
        <div className='profile container'>
            
             <h4>Profile Details</h4>
            
             
             <table>
                 <tr>
                     <td><BsFillPersonFill /> Full Name</td>
                     <td><input type="text" className="p_input" placeholder={user_details.cust_name} onChange={(e)=>{setEditName(e.target.value)}} disabled={true}/></td>
                 </tr>
                 <tr>
                     <td><AiFillPhone /> Number</td>
                     <td><input type="number" className="p_input" placeholder={user_details.cust_phone} onChange={(e)=>{setEditPhone(e.target.value)}} disabled={true}/></td>
                 </tr>
                 <tr>
                     <td><MdEmail /> EmailID</td>
                     <td><input type="text" className="p_input" placeholder={user_details.cust_email} onChange={(e)=>{setEditEmail(e.target.value)}} disabled={true}/></td>
                 </tr>
                 <tr>
                     <td><AiFillCreditCard /> Password</td>
                     <td><input type="text" className="p_input" placeholder={user_details.cust_password} onChange={(e)=>{setEditPassword(e.target.value)}} disabled={true}/></td>
                 </tr>
             </table>
             <button className="button" ><Link to="/edituser"> <MdEdit /> Edit </Link></button>
          
            
       
        </div>
    )
}

export default Profile