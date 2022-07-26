import React, { useState } from "react";
import style from "./ImageUpload.module.css";

const NO_IMAGE = 'Tap to upload (max 5mb)'
const HAS_IMAGE = "Tap to change (max 5mb)"

const ImageUpload = ({fileUrl, setFileUrl}) => {
    const [uploading, setUploading] = useState(false)
    const [msg, setMsg] = useState(fileUrl ? HAS_IMAGE : NO_IMAGE);
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
            setMsg(HAS_IMAGE)
            setFileUrl(url)
            e.target.value = null;
        } catch(e) {
            setUploading(false)
        }
    }

    const backgroundStyle = fileUrl
        ? { backgroundImage: `url(${fileUrl}`, backgroundSize: "cover", borderRadius: "12px" }
        : null;
    return (
        <div style={backgroundStyle} className={style.form}>
            <label className={style.label} style={uploading || fileUrl ? { opacity: ".7"} : null}>
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