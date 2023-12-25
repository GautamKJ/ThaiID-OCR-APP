import React, { useContext, useEffect, useState } from 'react'
import {Link,useNavigate} from "react-router-dom";

export default function View() {
	// state for record
	const [detail,setDetail]=useState([]);

	// set image
	const[image,setImage]=useState();

	// state for search item (filter)
	const [searchItem, setSearchItem] = useState([])

	// set the initial state of filteredUsers to an empty array
	const [filteredUsers, setFilteredUsers] = useState([])

	// set the initial filter on first_name +lastName'

	const [filterdata,setFilterdata]=useState('Status');

	const handleSelectFilter=(e)=>{
		console.log("filteSelect",e.target.innerText)
		const dropdown = document.querySelector('.dropdown-content');
		// dropdown.style.display = 'none';
		// dropdown.setAttribute('display','none')
		setFilterdata(e.target.innerText);
	}


	const handleInputChange = (e) => { 
		const searchTerm = e.target.value;
		setSearchItem(searchTerm)
		console.log("filterdata "+filterdata);
		// filter the items using the detail state
		if(filterdata=='issue Date'){
		const filteredItems = detail.filter((user) =>
		(user[filterdata]).toLowerCase().includes(searchTerm.toLowerCase())
		
	  );
	  setFilteredUsers(filteredItems);
		}

		if(filterdata=='Expiry Date'){
			const filteredItems = detail.filter((user) =>
			(user.expiryDate).toLowerCase().includes(searchTerm.toLowerCase())
		  );
		  setFilteredUsers(filteredItems);
			}

			if(filterdata=='Status'){
				const filteredItems = detail.filter((user) =>
				(user.status).toLowerCase().includes(searchTerm.toLowerCase())
			  );
			  setFilteredUsers(filteredItems);
				}
	
	  
	  }
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
		  setFilteredUsers(json)
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
					<div class="head head_nav">
						<h3>Records</h3>
                        
                            <div class="form-input">
                                <input type="search" placeholder="Type to search"  value={searchItem}
        onChange={handleInputChange}/>
                                
                                
                            </div>
                        
						<div class="dropdown" >
                            <button class="dropbtn" ><i class='bx bx-filter' ></i></button>
                            <div class="dropdown-content" value={filterdata} onClick={handleSelectFilter} >
                                
                              <li>issue Date</li>
                              <li>Expiry Date</li>
                              <li>Status</li>
                            </div>
                          </div>
						
                           
					</div>
					{filteredUsers.length === 0
        ? <p>No users found</p>
        :
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
								filteredUsers.map((data,index)=>{
									return (
							<tr key={index}>
								<td>{index+1}</td>
								<td>
									<img src="https://www.sinosecu.com.cn/upload/20211018/KXa2NPVvXF278Wr6gTR.jpg"/>
									<p>{data.first_name + " "+data.lastName
									}</p>
								</td>
                                <td>{data.issueDate}</td>
                                <td>{data.expiryDate}</td>
								
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
