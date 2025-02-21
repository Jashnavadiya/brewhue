import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDrag, useDrop } from 'react-dnd';
import axios from 'axios';

const Section3 = ({ formData, handleChange, handleFileUpload, setFormData, shopName }) => {
    const [previewImages, setPreviewImages] = useState(formData.home.section3Img || []);

    // Fetch images from database (if necessary)
    useEffect(() => {
        if (formData.home.section3Img) {
            setPreviewImages(formData.home.section3Img);
        }
    }, [formData.home.section3Img]);

    const handleAddImage = () => {
        setFormData((prevFormData) => {
            const updatedHome = { ...prevFormData.home };
            updatedHome.section3Img = [...updatedHome.section3Img, { img: "", _id: "" }];
            return { ...prevFormData, home: updatedHome };
        });
    };

    const handleRemoveImage = (index) => {
        setFormData((prevFormData) => {
            const updatedHome = { ...prevFormData.home };
            updatedHome.section3Img = updatedHome.section3Img.filter((_, i) => i !== index);
            return { ...prevFormData, home: updatedHome };
        });
    };

    const handleImageOrderChange = (draggedIndex, targetIndex) => {
        const reorderedImages = [...previewImages];
        const [movedItem] = reorderedImages.splice(draggedIndex, 1);
        reorderedImages.splice(targetIndex, 0, movedItem);

        // Update the preview images in local state
        setPreviewImages(reorderedImages);

        // Update the formData with the new image order
        setFormData((prevFormData) => {
            const updatedHome = { ...prevFormData.home };
            updatedHome.section3Img = reorderedImages;  // Ensure section3Img matches new order
            return { ...prevFormData, home: updatedHome };
        });
    };


    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const fileURLs = acceptedFiles.map((file) => URL.createObjectURL(file));
            setPreviewImages((prev) => [...prev, ...fileURLs]);
            // Assuming handleFileUpload handles backend upload and updates the section3Img in formData
            handleFileUpload(acceptedFiles, "home", "section3Img",acceptedFiles) // // Add the uploaded files
        },
        multiple: true,
        accept: 'image/*',
    });

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Section 3</h2>
            <div className="space-y-4">
                {/* Section 3 Heading */}
                <textarea
                    type="text"
                    name="section3Heading"
                    value={formData.home.section3Heading}
                    onChange={(e) => handleChange(e, 'home', 'section3Heading')}
                    placeholder="Section 3 Heading"
                    className="w-full p-2 border rounded"
                />

                {/* Section 3 Images */}
                <div className="space-y-2 border p-2 rounded-md">
                    {/* Drag and Drop Area */}
                    <div
                        {...getRootProps()}
                        className="cursor-pointer w-full h-24 bg-gray-200 border-dashed border-2 flex justify-center items-center"
                    >
                        <input {...getInputProps()} />
                        <p>Drag & drop images here, or click to select</p>
                    </div>

                    {/* Image Previews and Reordering */}
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {previewImages.length > 0 ? (
                            previewImages.map((imgSrc, index) => (
                                <ImagePreview
                                    key={index}
                                    index={index}
                                    imgSrc={`${imgSrc.img}`}
                                    handleRemoveImage={handleRemoveImage}
                                    handleImageOrderChange={handleImageOrderChange}
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                </div>

                {/* Add Image Button */}
                <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Add Image
                </button>
            </div>
        </div>
    );
};

const ImagePreview = ({ imgSrc, index, handleRemoveImage, handleImageOrderChange }) => {
    const [, drag] = useDrag({
        type: 'image',
        item: { index },
    });

    const [{ isOver }, drop] = useDrop({
        accept: 'image',
        drop: (item) => {
            const draggedIndex = item.index;
            handleImageOrderChange(draggedIndex, index);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={`relative group ${isOver ? 'bg-gray-100' : ''}`}
            style={{ cursor: 'move' }}
        >
            <img src={imgSrc} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded" />
            <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
                X
            </button>
        </div>
    );
};

export default Section3;
