import React, { useState } from "react";

const URL = "https://www.planetware.com/photos-large/ENG/england-stonehenge.jpg";

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [msg, setMsg] = useState('Tap to upload (max size 5mb)');
    const handleSubmit = async e => {
        e.preventDefault();
        // if (selectedFile.size > 1024 * 1024 * 5) {
        //     return alert("File too big!")
        // }
        // const formData = new FormData();
        // formData.append("photo", selectedFile);
        // const result = await fetch("http://localhost:3001/api/cloudinary", {
        //     method: "POST",
        //     body: formData
        // })
        // const data = await result.json();
        // console.log(data)
    }
    const handleAddFile = e => {
        const file = e.target.files[0];
        if (file.size > 1024 * 1024 * 5) {
            setMsg("File too large, please try again");
            return;
        }
        setSelectedFile(file);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                onChange={handleAddFile}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default ImageUpload;