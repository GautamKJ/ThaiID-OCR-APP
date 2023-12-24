import React, { useContext, useEffect, useState } from 'react'
import {Link,useNavigate} from "react-router-dom";

export default function Sidebar() {
	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => {
		

		if(!darkMode) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
		setDarkMode(!darkMode);
	  };
	
	const menubar=()=>{
		const sidebar = document.getElementById('sidebar');
		sidebar.classList.toggle('hide');
	}
  return (
    <div>


	<section id="sidebar">
		<Link to="/dashboard" classNameName="brand">
			
			<span className="text">แบบไทย ID</span>
		</Link>
		<ul className="side-menu top">
			<li className="active">
				<Link to="/dashboard">
					<i className='bx bxs-dashboard' ></i>
					<span className="text">Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/view">
					<i className='bx bxs-shopping-bag-alt' ></i>
					<span className="text">View</span>
				</Link>
			</li>
			<li>
				<Link to="#">
					<i className='bx bxs-doughnut-chart' ></i>
					<span className="text">History</span>
				</Link>
			</li>
			
			
		</ul>
		
	</section>

    
	<section id="content">
	
		<nav>
			<i class='bx bx-menu' onClick={menubar}></i>
			
			
			<input type="checkbox" id="switch-mode" hidden onClick={toggleDarkMode}/>
			<label for="switch-mode" className={`switch-mode ${darkMode ? 'dark' : 'light'}` } ></label>
		

		
		</nav>
        </section>
	
      
    </div>
  )
}
