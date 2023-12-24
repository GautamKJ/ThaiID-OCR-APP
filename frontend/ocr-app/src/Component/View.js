import React, { useContext, useEffect, useState } from 'react'
import {Link,useNavigate} from "react-router-dom";

export default function View() {
	// state for record
	const [detail,setDetail]=useState([]);

	// set image
	const[image,setImage]=useState();

	// delete record

	const deleteItem=async(id)=>{
		// window.alert(id);
		try {
			
			const response=await fetch(`http://localhost:8081/api/deleterecord/${id}`,{
			  method:"POST",
			  headers:{
				// 'content-Type':'application/json',
				// 'auth-token':localStorage.getItem('token')
			  },
			//   body:JSON.stringify({complain_status:currstatus})
			  
			});
			// let json= await response.json();
			fetchdata();
			// console.log(json);
		}
		catch (error) {
 
			console.log (error);
		  }
	}

	const fetchdata= async()=>{
		
	
		try {
	   
		  const response=await fetch("http://localhost:8081/api/fetchrecord",{
			method:"GET",
			headers:{
			//   'content-Type':'application/json',
			//   'auth-token':localStorage.getItem('token')
			},
			
		  });
		  let json= await response.json();
		  setDetail(json);
		  
		  console.log(detail);
		 
		  
		}
		catch (error) {
	   
		  console.log (error);
		}
	}

	useEffect(()=>{
   
		fetchdata();
	   
	  },[]);

  return (
    <div>
      <section id="content">

		<main>


			<div class="table-data">
				<div class="order">
					<div class="head">
						<h3>Records</h3>
                        <form action="#">
                            <div class="form-input">
                                <input type="search" placeholder="Search..."/>
                                <button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
                                
                            </div>
                        </form>
						<div class="dropdown" >
                            <button class="dropbtn"><i class='bx bx-filter' ></i></button>
                            <div class="dropdown-content">
                                
                              <li>Link 1</li>
                              <li>Link 2</li>
                              <li>Link 3</li>
                            </div>
                          </div>
						
                           
					</div>
					{ detail.length>0 && 
					<div class="tableContainer">
					<table>
						<thead>
							<tr>
								<th>S.No</th>
								<th>User</th>
								<th>Issue Date</th>
                                <th>Expiry Date</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody >
							{
								detail.map((data,index)=>{
									return (
							<tr key={index}>
								<td>{index+1}</td>
								<td>
									<img src="https://www.sinosecu.com.cn/upload/20211018/KXa2NPVvXF278Wr6gTR.jpg"/>
									<p>{data.first_name + " "+data.lastName
									}</p>
								</td>
                                <td>{data.issueDate}</td>
                                <td>{data.dob}</td>
								
								<td><span class="status completed"  >{data.status}</span></td>
                     <td ><button onClick={async() => await deleteItem(data._id)} ><i class='bx bxs-trash' ></i></button></td>
							</tr>
									)
								})}
						</tbody>
					</table>
					</div>
}
				</div>
				
			</div>
		</main>
		
	</section>
	
	
    </div>
  )
}
