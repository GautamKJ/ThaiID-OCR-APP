import React, { useContext, useEffect, useState } from 'react'
import {Link,useNavigate} from "react-router-dom";

export default function View() {
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
					<table>
						<thead>
							<tr>
								<th>User</th>
								<th>Date</th>
                                <th>Date of Birth</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<img src="img/people.png"/>
									<p>John Doe</p>
								</td>
                                <td>24 DEC</td>
                                <td>24 AUG 2002</td>
								
								<td><span class="status completed">Completed</span></td>
                                <td><i class='bx bxs-like bx-spin'></i></td>
							</tr>
							
						</tbody>
					</table>
				</div>
				
			</div>
		</main>
		
	</section>
	
	
    </div>
  )
}
