import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserPanel = () => {
    const { shopName } = useParams();
    const [formData, setFormData] = useState({
        home: {
            section6: {
                time_period: "",
                time_open: "",
                time_close: "",
                address: "",
                number: [""],
            },
            logo: "",
            darkLogo: "",
            section1Img: "", // Initialize as empty string or appropriate default
            section1Text: "",
            section2Heading: "",
            section2Info: [],
            section3Heading: "",
            section3Img: [{ img: "", _id: "" }],
            section4Heading: "",
            section4Pdf: "",
            section5Heading: "",
            section5Comments: [{ logo_name: "", name: "", review: "", date: "", _id: "" }],
        },
        social: {
            insta: [""],
            facebook: [""],
            twitter: [""],
            pinterest: [""],
            linkedin: [""],
            yt: [""],
        },
    });

    // Fetch data on component mount
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/shopinfo/userpanel`)
            .then((res) => {
                console.log("Fetched data:", res.data); // Log the fetched data
                setFormData(res.data);
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);


    const handleChange = (e, parentKey, childKey, nestedKey = null, index = null) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updatedHome = { ...prev[parentKey] };

            if (nestedKey) {
                // Handle updates for nested objects like section6
                updatedHome[childKey] = {
                    ...updatedHome[childKey],
                    [nestedKey]: value,
                };
            } else if (index !== null) {
                // For arrays like section5Comments
                updatedHome[childKey] = updatedHome[childKey].map((item, idx) =>
                    idx === index ? { ...item, [name]: value } : item
                );
            } else {
                // For single-level properties
                updatedHome[childKey] = value;
            }

            return { ...prev, [parentKey]: updatedHome };
        });
    };

    const handleWordLimit = (e, wordLimit, parentKey, childKey, index) => {
        const { name, value } = e.target;

        // Split input value by spaces to count words
        const words = value.trim().split(/\s+/);

        // If word limit is exceeded, show alert
        if (words.length > wordLimit) {
            alert(`You have reached the maximum word limit of ${wordLimit} words.`);
            return;
        }

        // Update state if within word limit
        handleChange(e, parentKey, childKey, null, index);
    };



    // Handle file upload
    const handleFileUpload = async (e, section, key) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("section", section);
        formData.append("key", key);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/${shopName}/userpanel/home/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const updatedUserPanel = response.data.updatedUserPanel.home;

            setFormData((prevFormData) => ({
                ...prevFormData,
                home: updatedUserPanel, // Update the home data with the latest response
            }));
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file. Please try again.");
        }
    };

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

    const handleRemoveSection2Info = (index) => {
        const updatedInfo = [...formData.home.section2Info];
        updatedInfo.splice(index, 1);
        setFormData((prev) => ({
            ...prev,
            home: {
                ...prev.home,
                section2Info: updatedInfo,
            },
        }));
    };

    const handleAddSection2Info = () => {
        setFormData((prev) => ({
            ...prev,
            home: {
                ...prev.home,
                section2Info: Array.isArray(prev.home.section2Info)
                    ? [...prev.home.section2Info, { img: "", text: "" }]
                    : [{ img: "", text: "" }], // Fallback to a new array
            },
        }));
    };

    const handleAddComment = () => {
        setFormData((prev) => ({
            ...prev,
            home: {
                ...prev.home,
                section5Comments: [
                    ...(prev.home.section5Comments || []),
                    { logo_name: "", name: "", review: "", date: "" }, // Default structure
                ],
            },
        }));
    };

    const handleRemoveComment = (index) => {
        setFormData((prev) => ({
            ...prev,
            home: {
                ...prev.home,
                section5Comments: prev.home.section5Comments.filter((_, i) => i !== index),
            },
        }));
    };
    const handleSocialLinkChange = (e, platform, index) => {
        const { value } = e.target;

        setFormData((prev) => {
            const updatedSocial = { ...prev.social };
            updatedSocial[platform][index] = value; // Update the specific link at the given index
            return { ...prev, social: updatedSocial };
        });
    };

    const handleAddSocialLink = (platform) => {
        setFormData((prev) => {
            const updatedSocial = { ...prev.social };
            updatedSocial[platform] = [...updatedSocial[platform], ""]; // Add a new empty link
            return { ...prev, social: updatedSocial };
        });
    };

    const handleRemoveSocialLink = (platform, index) => {
        setFormData((prev) => {
            const updatedSocial = { ...prev.social };
            updatedSocial[platform] = updatedSocial[platform].filter((_, i) => i !== index); // Remove the link at the given index
            return { ...prev, social: updatedSocial };
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Preprocess data: Replace actual line breaks with '\n'
        const preprocessData = (data) => {
            if (typeof data === "string") {
                return data.replace(/\n/g, "\\n"); // Replace actual newlines with '\n'
            } else if (Array.isArray(data)) {
                return data.map((item) => preprocessData(item));
            } else if (typeof data === "object" && data !== null) {
                const newData = {};
                Object.keys(data).forEach((key) => {
                    newData[key] = preprocessData(data[key]);
                });
                return newData;
            }
            return data;
        };

        const processedFormData = preprocessData(formData);

        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/shopinfo/userpanel`, processedFormData);
            alert("Data updated successfully!");
        } catch (err) {
            console.error("Error updating data:", err);
            alert("Failed to update data.");
        }
    };
    if (!formData || !formData.home || !formData.social) {
        // Optionally render a loading state or nothing until data is fetched
        return <div>Loading...</div>;
    }
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Logo */}
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Logos</h2>
                    <div className="space-y-4">
                        <textarea
                            type="text"
                            name="logo"
                            value={formData.home.logo || ""}
                            onChange={(e) => handleChange(e, "home", "logo")}
                            placeholder="Logo URL"
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="file"
                            onChange={(e) => handleFileUpload(e, "home", "logo")}
                            className="w-full p-2 border rounded"
                        />

                        <textarea
                            type="text"
                            name="darkLogo"
                            value={formData.home.darkLogo || ""}
                            onChange={(e) => handleChange(e, "home", "darkLogo")}
                            placeholder="Dark Logo URL"
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="file"
                            onChange={(e) => handleFileUpload(e, "home", "darkLogo")}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                {/* Section 1 */}
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Section 1</h2>
                    <div className="space-y-4">
                        {console.log(formData.home)
                        }
                        <textarea
                            type="text"
                            name="section1Img"
                            value={formData.home.section1Img || ""} // Fallback to empty string
                            onChange={(e) => handleChange(e, "home", "section1Img")}
                            placeholder="Section 1 Image URL"
                            className="w-full p-2 border rounded"
                        />
                        <textarea
                            name="section1Text"
                            value={formData.home.section1Text || ""}
                            onChange={(e) => handleChange(e, "home", "section1Text")}
                            placeholder="Section 1 Text"
                            className="w-full p-2 border rounded"
                        ></textarea>

                        <input
                            type="file"
                            onChange={(e) => handleFileUpload(e, "home", "section1Img")}
                            className="w-full p-2 border rounded"
                        />

                    </div>
                </div>


                {/* Section 2 */}
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Section 2</h2>
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
                            <div key={index} className="space-y-2 border p-2 rounded-md">
                                <textarea
                                    type="text"
                                    name="img"
                                    value={info.img || ""}
                                    onChange={(e) => handleChange(e, "home", "section2Info", null, index)}
                                    placeholder="Image URL"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="file"
                                    onChange={(e) => handleFileUpload(e, "home", "section2Info", null, index)}
                                    className="w-full p-2 border rounded"
                                />
                                <textarea
                                    type="text"
                                    name="text"
                                    value={info.text || ""}
                                    onChange={(e) => handleChange(e, "home", "section2Info", null, index)}
                                    placeholder="Text"
                                    className="w-full p-2 border rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSection2Info(index)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}


                        {/* Add Info Button */}
                        <button
                            type="button"
                            onClick={handleAddSection2Info}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Add Info
                        </button>
                    </div>
                </div>


                {/* Section 3 */}
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Section 3</h2>
                    <div className="space-y-4">
                        {/* Section 3 Heading */}
                        <textarea
                            type="text"
                            name="section3Heading"
                            value={formData.home.section3Heading}
                            onChange={(e) => handleChange(e, "home", "section3Heading")}
                            placeholder="Section 3 Heading"
                            className="w-full p-2 border rounded"
                        />

                        {/* Section 3 Images */}
                        {formData.home.section3Img.map((imgObj, index) => (
                            <div key={index} className="space-y-2 border p-2 rounded-md">
                                <textarea
                                    type="text"
                                    name="img"
                                    value={imgObj.img}
                                    onChange={(e) => handleChange(e, "home", "section3Img", index)}
                                    placeholder="Image URL"
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="file"
                                    onChange={(e) => handleFileUpload(e, "home", "section3Img", index)}
                                    className="w-full p-2 border rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

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

                {/* Section 4 */}
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Section 4</h2>
                    <div className="space-y-4">
                        <textarea
                            type="text"
                            name="section4Heading"
                            value={formData.home.section4Heading}
                            onChange={(e) => handleChange(e, "home", "section4Heading")}
                            placeholder="Section 4 Heading"
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="file"
                            onChange={(e) => handleFileUpload(e, "home", "section4Pdf")}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                {/* Section 5 */}
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Section 5</h2>
                    <div className="space-y-4">
                        {/* Section 5 Heading */}
                        <textarea
                            type="text"
                            name="section5Heading"
                            value={formData.home.section5Heading}
                            onChange={(e) => handleChange(e, "home", "section5Heading")}
                            placeholder="Section 5 Heading"
                            className="w-full p-2 border rounded"
                        />

                        {/* Section 5 Comments */}
                        {formData.home.section5Comments.map((comment, index) => (
                            <div key={index} className="space-y-2 border p-2 rounded-md">
                                <textarea
                                    name="logo_name"
                                    value={comment.logo_name || ""}
                                    onChange={(e) => handleChange(e, "home", "section5Comments", null, index)}
                                    placeholder="Logo Name"
                                    className="w-full p-2 border rounded"
                                />
                                <textarea
                                    name="name"
                                    value={comment.name || ""}
                                    onChange={(e) => handleChange(e, "home", "section5Comments", null, index)}
                                    placeholder="Name"
                                    className="w-full p-2 border rounded"
                                />
                                <textarea
                                    name="review"
                                    value={comment.review || ""}
                                    onChange={(e) => handleWordLimit(e, 25, "home", "section5Comments", index)} // Limit set to 25 words
                                    placeholder="Review"
                                    className="w-full p-2 border rounded"
                                />

                                <textarea
                                    type="text"
                                    name="date"
                                    value={comment.date || ""}
                                    onChange={(e) => handleChange(e, "home", "section5Comments", null, index)}
                                    placeholder="Date"
                                    className="w-full p-2 border rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveComment(index)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        {/* Add Comment Button */}
                        <button
                            type="button"
                            onClick={handleAddComment}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Add Comment
                        </button>
                    </div>
                </div>


                {/* Section 6 */}
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Section 6</h2>
                    <div className="space-y-4">
                        <textarea
                            type="text"
                            name="time_period"
                            value={formData.home.section6.time_period}
                            onChange={(e) => handleChange(e, "home", "section6", "time_period")}
                            placeholder="Time Period"
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="time"
                            name="time_open"
                            value={formData.home.section6.time_open}
                            onChange={(e) => handleChange(e, "home", "section6", "time_open")}
                            placeholder="Time Open"
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="time"
                            name="time_close"
                            value={formData.home.section6.time_close}
                            onChange={(e) => handleChange(e, "home", "section6", "time_close")}
                            placeholder="Time Close"
                            className="w-full p-2 border rounded"
                        />
                        <textarea
                            type="text"
                            name="address"
                            value={formData.home.section6.address}
                            onChange={(e) => handleChange(e, "home", "section6", "address")}
                            placeholder="Address"
                            className="w-full p-2 border rounded"
                        />
                        {formData.home.section6.number.map((num, index) => (
                            <textarea
                                key={index}
                                type="text"
                                name="number"
                                value={num}
                                onChange={(e) => {
                                    const updatedNumbers = [...formData.home.section6.number];
                                    updatedNumbers[index] = e.target.value;
                                    setFormData((prev) => ({
                                        ...prev,
                                        home: {
                                            ...prev.home,
                                            section6: {
                                                ...prev.home.section6,
                                                number: updatedNumbers,
                                            },
                                        },
                                    }));
                                }}
                                placeholder={`Phone Number ${index + 1}`}
                                className="w-full p-2 border rounded"
                            />
                        ))}
                    </div>

                </div>

                {/* Social Links Section */}
                <div className="space-y-4">
                    {["insta", "facebook", "twitter", "pinterest", "linkedin", "yt"].map((platform) => (
                        <div key={platform} className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">
                                {platform.charAt(0).toUpperCase() + platform.slice(1)} Links
                            </label>
                            {formData.social[platform]?.map((link, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={link}
                                        onChange={(e) => handleSocialLinkChange(e, platform, index)}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder={`Edit ${platform} link`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSocialLink(platform, index)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddSocialLink(platform)}
                                className="px-4 py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Add New {platform.charAt(0).toUpperCase() + platform.slice(1)} Link
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default UserPanel;
