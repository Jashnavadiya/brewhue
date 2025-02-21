import { useDropzone } from 'react-dropzone';

// Section 2 Component
const Section2 = ({ formData, handleChange, handleFileUpload, handleAddSection2Info, handleRemoveSection2Info }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*', // Accept image files only
       onDrop: (acceptedFiles) => handleFileUpload(acceptedFiles, "home", "section2Info",acceptedFiles), // Pass accepted files to the handler
    });

    return (
        <div className="p-4 bg-cyan-800 shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4 ">Section 2(buz logo are f*** up)</h2>
            <div className="space-y-4">
                {/* Section 2 Heading */}
                <textarea
                    type="text"
                    name="section2Heading"
                    value={formData.home.section2Heading}
                    onChange={(e) => handleChange(e, "home", "section2Heading")}
                    placeholder="Section 2 Heading"
                    className="w-full p-2 border rounded"
                />
                {/* Section 2 Info */}
                {formData.home.section2Info.map((info, index) => (
                    <div key={index} className="space-y-2 border p-2 rounded-md flex">
                        {/* Image URL */}
                        {/* <textarea
                            type="text"
                            name="img"
                            value={info.img || ""}
                            onChange={(e) => handleChange(e, "home", "section2Info", null, index)}
                            placeholder="Image URL"
                            className="w-full p-2 border rounded"
                        /> */}

                        {/* Drag and Drop File Upload */}
                        <div className="w-full">
                            <div className="flex">
                                <img className="" src={`${info.img}`} />
                                <div
                                    {...getRootProps()}
                                    className="w-full p-4 border-dashed border-2 border-gray-300 rounded mb-4 cursor-pointer"
                                >
                                    <input {...getInputProps()} />
                                    <p>Drag & Drop an image here, or click to select one</p>
                                </div>
                            </div>

                            <textarea
                                type="text"
                                name="text"
                                value={info.text || ""}
                                onChange={(e) => handleChange(e, "home", "section2Info", null, index)}
                                placeholder="Text"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                       <span className="">
                       <button
                            type="button"
                            onClick={() => handleRemoveSection2Info(index)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Remove
                        </button>
                       </span>
                    </div>
                ))}

                {/* Add Info Button */}
                <button
                    type="button"
                    onClick={handleAddSection2Info}
                    className="px-4 py-2 w-max bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Add Info
                </button>
            </div>
        </div>
    );
};
export default Section2