import { useState } from "react";

function App() {
	const [image, setImage] = useState("");
	const [imageurl, setImageurl] = useState("");

	const handleChange = (e) => {
		const file = e.target.files[0];
		const fileReader = new FileReader();
		setImage(file);
		console.log(image);
		if (file) {
			fileReader.readAsDataURL(file);
			fileReader.onloadend = () => {
				setImageurl(fileReader.result);
			};
		}
	};

	const handleSubmit = async(e) => {
		e.preventDefault();
		const data = new FormData();

		if (image) {
			data.append("file", image);
			const response = await fetch('http://localhost:5000', {
				method: 'POST',
				body: data,
			})
			const resJSON = await response.json()

			console.log(resJSON)
		}
	};

	return (
		<>
			{image ? (
				<img className="user-image" src={imageurl} alt="userPhoto" />
			) : (
				<></>
			)}
			<form encType="multipart/form-data" onSubmit={handleSubmit}>
				<input type="file" name="filename" onChange={handleChange} />
				<button type="submit">Submit</button>
			</form>
			<img src="https://crafty-app.s3.us-east-2.amazonaws.com/da85db1ba47e4d798d464157293a1477.jpg" />
		</>
	);
}

export default App;
