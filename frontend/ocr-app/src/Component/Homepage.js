import React from 'react'
import  { useContext, useEffect, useState } from 'react'
import Spinner from './Spinner';

export default function Homepage() {
	// Set Image to ui and store in database
	const [image, setImage] = useState({ preview: "", raw: "" });

	// state for loading
	const [loading,setLoading]=useState(false);

	const handleOnClick=(e)=>
	{
		e.preventDefault();
		if (e.target.files.length) {
			setImage({
			  preview: URL.createObjectURL(e.target.files[0]),
			  raw: e.target.files[0]
			});
		  }
		  console.log("Image ",image.preview+"	"+image.raw);
	}
	const onsubmit=async(e)=>{
		// window.alert("ertyu"+e);
		setLoading(true);
	const spinner=document.getElementById('l-spinner');
		spinner.classList.remove('d-none');
		// button.setAttribute('disabled', '');
		e.preventDefault();
		try {
	
			const formData = new FormData();
			formData.append("uploadedImage", image.raw);
		
		const response=	await fetch("http://localhost:8081/api/create_user", {
			  method: "POST",
			  headers: {
				// 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
			  },
			  body: formData
			});
			let json= await response.json();
		console.log(json);
		spinner.classList.add('d-none');
		setLoading(false);
		  
		  

	}
	catch(err)
	{
		
	}
}

  return (
    <>
     
	<section id="content">
		
		
		
		<main>
			
			  <div class="mt-5">

				<div class="row g-3 w-100">
					<div class="col-6">
						<form onSubmit={onsubmit} class="input-group mb-5">
							<input type="file" class="form-control" name="uploadedimage" onChange={handleOnClick} aria-describedby="inputGroupFileAddon03" aria-label="Upload" accept=".bmp, .jpg, .png, .pbm, .webp"/>
						
					
							<button type="submit" id="cbtn" class="btn btn-primary">
								<span id="l-spinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
								Recognize text
							</button>
					</form>
					<div class="col-6 upload_img">
						<div class="card img_card left">
							<img id="i-img"  src={image.preview} class="card-img-top" alt="Image"/>
						</div>
						
						<div class="right">
							<pre id="o-art">
								{
									"asdflk"
								}
							</pre>
						</div>
						
						
					
</div>
					
				</div>
		
			</div>
</div>

			
		</main>
		
	</section>
	
	

    </>
  )
}
