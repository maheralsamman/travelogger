import React, { useState } from "react";
import style from "./ImageUpload.module.css";

const DEFAULT_MESSAGE = 'Tap to upload (max 5mb)'

const ImageUpload = ({fileUrl, setFileUrl}) => {
    const [uploading, setUploading] = useState(false)
    const [msg, setMsg] = useState(DEFAULT_MESSAGE);
    const handleAddFile = async e => {
        const file = e.target.files[0];
        if (file.size > 1024 * 1024 * 5) {
            setMsg("File too large (max 5mb)");
            return;
        }
        const [fileType] = file.type.split('/')
        if (fileType !== 'image') {
            setMsg("File must be image (max 5mb)")
            return;
        }
        setUploading(true)
        try {
            const formData = new FormData();
            formData.append("photo", file);
            const result = await fetch("http://localhost:3001/api/cloudinary", {
                method: "POST",
                body: formData,
            })
            const { url } = await result.json()
            setUploading(false)
            setMsg(DEFAULT_MESSAGE)
            setFileUrl(url)
        } catch(e) {
            setUploading(false)
            console.log(e.message)
        }
    }

    const backgroundStyle = fileUrl
        ? { backgroundImage: `url(${fileUrl}`, backgroundSize: "cover" }
        : null;
    return (
        <div style={backgroundStyle} className={style.form}>
            <label className={style.label} style={uploading ? { opacity: ".5"} : null}>
                {uploading ? "Uploading..." : msg}
                <input
                    className={style.input}
                    type="file"
                    onChange={handleAddFile}
                    disabled={uploading}
                />
            </label>
        </div>
    )
}

export default ImageUpload;