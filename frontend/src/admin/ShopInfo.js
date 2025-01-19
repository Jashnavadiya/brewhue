import React, { useState } from "react";

const LivePreviewForm = () => {
    const [previewData, setPreviewData] = useState({
        image: "",
        text: "Your text here",
    });

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setPreviewData((prev) => ({ ...prev, image: previewUrl }));
    };

    // Handle text input
    const handleTextChange = (e) => {
        const value = e.target.textContent; // For contentEditable
        setPreviewData((prev) => ({ ...prev, text: value }));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Live Preview Form</h1>
            {/* Live Preview and File Upload Container */}
            <div
                className="relative w-full h-64 border border-gray-300 rounded-md bg-gray-50 overflow-hidden flex items-center justify-center text-center cursor-pointer"
                style={{
                    backgroundImage: `url(${previewData.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                onClick={() => document.getElementById("fileInput").click()} // Simulates a click on the hidden file input
            >
                {/* Editable Text */}
                <div
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleTextChange}
                    className="relative z-10 text-xl font-bold text-white p-2 bg-black bg-opacity-50 rounded-md"
                    style={{ minWidth: "50%", textAlign: "center" }}
                >
                    {previewData.text}
                </div>

                {/* Hidden File Input */}
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default LivePreviewForm;
