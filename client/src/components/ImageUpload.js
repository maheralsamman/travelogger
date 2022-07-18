import React, { useState } from "react";

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
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
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default ImageUpload;