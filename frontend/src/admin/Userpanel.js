import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Section3 from "./userpanel/Section3";
import Section2 from "./userpanel/Section2";

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
        menu: {
            menu_info: "",
            menu_img: "",
        },
        social: {
            vcard: {},
            social_info: "",
            social_img: "",
            links: [
                {
                    name: "",
                    icon: "",
                    url: "",
                }
            ],
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
              
                setFormData(res.data);
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    useEffect(() => {
   
    }, [formData])


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
    const handleFileUpload = async (e, section, key, acceptedFiles) => {
        let file;

        // Check if files were dropped using Dropzone
        if (acceptedFiles && acceptedFiles.length > 0) {
           

            file = acceptedFiles[0]; // Use the first file from acceptedFiles
        } else if (e.target.files) {
            file = e.target.files[0]; // Fallback to file input if no files were dropped
        }

        if (!file) return; // If there's no file, exit

        const formData = new FormData();
        formData.append("file", file);
        formData.append("section", section);
        formData.append("key", key);

        try {
            const response = await axios.post(
                // `${process.env.REACT_APP_BASE_URL}/${shopName}/userpanel/home/upload`,
                `${process.env.REACT_APP_BASE_URL}/api/v1/file/${shopName}/upload`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const updatedUserPanel = response.data.updatedUserPanel[section];
      

            // Update only the section that was changed, and retain the rest of the form data
            setFormData((prevFormData) => ({
                ...prevFormData,
                [section]: {
                    ...prevFormData[section], // Keep existing values for the section
                    [key]: updatedUserPanel[key], // Only update the specific field
                },
            }));
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file. Please try again.");
        }
    };


    // Add a new link
    const handleAddLink = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            social: {
                ...prevFormData.social,
                links: [...prevFormData.social.links, { name: "", icon: "", url: "" }],
            },
        }));
    };

    // Remove a link
    const handleRemoveLink = (index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            social: {
                ...prevFormData.social,
                links: prevFormData.social.links.filter((_, i) => i !== index),
            },
        }));
    };

    // Handle link input changes dynamically
    const handleLinkChange = (e, index, key) => {
        const { value } = e.target;

        setFormData((prevFormData) => {
            const updatedLinks = [...prevFormData.social.links];
            updatedLinks[index][key] = value;
            return { ...prevFormData, social: { ...prevFormData.social, links: updatedLinks } };
        });
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
    const handleGenerateVCard = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/${shopName}/shopinfo/${shopName}/userpanel/generate-vcard`,
                {
                    name: formData.home.contactName || "",
                    phone: formData.home.contactPhone || "",
                    email: formData.home.contactEmail || "",
                    address: formData.home.contactAddress || "",
                    website: formData.home.contactWebsite || "",
                }
            );

            if (response.data.filePath) {
                alert("vCard generated successfully!");
            }
        } catch (err) {
            console.error("Error generating vCard:", err);
            alert("Failed to generate vCard");
        }
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

    useEffect(() => {
        
    }, [formData])
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
                    <div className="space-y-4 flex">
                        {/* Logo URL input */}
                        {/* <div className="flex items-center space-x-4">
                            <textarea
                                type="text"
                                name="logo"
                                value={formData.home.logo || ""}
                                onChange={(e) => handleChange(e, "home", "logo")}
                                placeholder="Logo URL"
                                className="w-full p-2 border rounded"
                            />
                            {formData.home.logo && (
                                <img src={formData.home.logo} alt="Logo Preview" className="h-12 w-12 object-contain" />
                            )}
                        </div> */}

                        {/* Logo file input */}
                        <div className="flex flex-col items-center space-x-4">
                            {formData.home.logo && (
                                <img src={`${formData.home.logo}`} alt="Logo Preview" className="h-28 w-28 object-contain" />
                            )}
                            <input
                                type="file"
                                onChange={(e) => handleFileUpload(e, "home", "logo")}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* Dark Logo URL input */}
                        {/* <div className="flex items-center space-x-4">
                            <textarea
                                type="text"
                                name="darkLogo"
                                value={formData.home.darkLogo || ""}
                                onChange={(e) => handleChange(e, "home", "darkLogo")}
                                placeholder="Dark Logo URL"
                                className="w-full p-2 border rounded"
                            />
                            {formData.home.darkLogo && (
                                <img src={formData.home.darkLogo} alt="Dark Logo Preview" className="h-12 w-12 object-contain" />
                            )}
                        </div> */}

                        {/* Dark Logo file input */}
                        <div className="flex flex-col items-center space-x-4">
                            {formData.home.darkLogo && (
                                <img src={`${formData.home.darkLogo}`} alt="Dark Logo Preview" className="h-28 w-28 object-contain" />
                            )}
                            <input
                                type="file"
                                onChange={(e) => handleFileUpload(e, "home", "darkLogo")}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 1 */}
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Section 1</h2>
                    <div className="space-y-4">
                        {/* Section 1 Image URL input */}
                        <div className="flex flex-col items-center space-x-4">
                            {/* <textarea
                                type="text"
                                name="section1Img"
                                value={formData.home.section1Img || ""} // Fallback to empty string
                                onChange={(e) => handleChange(e, "home", "section1Img")}
                                placeholder="Section 1 Image URL"
                                className="w-full p-2 border rounded"
                            /> */}
                            {formData.home.section1Img && (
                                <img src={`${formData.home.section1Img}`} alt="Section 1 Image Preview" className="h-28 w-28 object-contain" />
                            )}
                            <input
                                type="file"
                                onChange={(e) => handleFileUpload(e, "home", "section1Img")}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* Section 1 Text input */}
                        <div className="flex items-center space-x-4">
                            <textarea
                                name="section1Text"
                                value={formData.home.section1Text || ""}
                                onChange={(e) => handleChange(e, "home", "section1Text")}
                                placeholder="Section 1 Text"
                                className="w-full p-2 border rounded"
                            ></textarea>
                        </div>
                    </div>
                </div>



                {/* Section 2 */}
                <Section2
                    formData={formData}
                    handleChange={handleChange}
                    handleFileUpload={handleFileUpload}
                    handleAddSection2Info={handleAddSection2Info}
                    handleRemoveSection2Info={handleRemoveSection2Info}
                />

                {/* Section 3 */}
                <Section3
                    formData={formData}
                    handleChange={handleChange}
                    handleFileUpload={handleFileUpload}
                    setFormData={setFormData}
                    shopName="shopName"
                />

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



                {/* Menu Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Menu</h2>

                    {/* Menu Info */}
                    <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-700">Menu Info</label>
                        <textarea
                            name="menu_info"
                            value={formData.menu.menu_info || ""}
                            onChange={(e) => handleChange(e, "menu", "menu_info")}
                            placeholder="Enter a brief description for your menu."
                            className="w-full p-2 border rounded"
                        ></textarea>
                    </div>

                    {/* Menu Image */}
                    <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-700">Menu Image</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileUpload(e, "menu", "menu_img")}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                {/* Social Links Section */}

                <h2 className="text-2xl font-semibold">Social Media</h2>

                {/* Social Info */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-gray-700">Social Info</label>
                    <textarea
                        name="social_info"
                        value={formData.social.social_info || ""}
                        onChange={(e) => handleChange(e, "social", "social_info")}
                        placeholder="Enter a brief description for your social section."
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>

                {/* Social Image */}
                <div className="space-y-4">
                    <label className="block text-lg font-medium text-gray-700">Social Image</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "social", "social_img")}
                        className="block w-full p-2 border rounded"
                    />
                    {formData.social.social_img && (
                        <div className="mt-2">
                            <img
                                src={formData.social.social_img}
                                alt="Social"
                                className="h-32 w-32 object-cover rounded"
                            />
                        </div>
                    )}
                </div>

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

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Manage Links</h2>
                    {formData.social.links.map((link, index) => (
                        <div key={index} className="space-y-2 border p-2 rounded-md">
                            {/* Platform Name Input */}
                            <input
                                type="text"
                                name="name"
                                value={link.name}
                                onChange={(e) => handleLinkChange(e, index, "name")}
                                placeholder="Platform Name (e.g. Instagram)"
                                className="w-full p-2 border rounded"
                            />

                            {/* Icon URL Input */}
                            <input
                                type="text"
                                name="icon"
                                value={link.icon || ''}
                                onChange={(e) => handleLinkChange(e, index, "icon")}
                                placeholder="Icon URL"
                                className="w-full p-2 border rounded"
                            />

                            {/* Platform URL Input */}
                            <input
                                type="url"
                                name="url"
                                value={link.url}
                                onChange={(e) => handleLinkChange(e, index, "url")}
                                placeholder="Platform URL"
                                className="w-full p-2 border rounded"
                            />

                            {/* File Upload for Icon */}
                            <input
                                type="file"
                                onChange={(e) => handleFileUpload(e, "social", `links`)}
                                className="w-full p-2 border rounded"
                            />

                            {/* Remove Link Button */}
                            <button
                                type="button"
                                onClick={() => handleRemoveLink(index)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Add New Link Button */}
                    <button
                        type="button"
                        onClick={handleAddLink}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Add Link
                    </button>
                </div>


                {/* Contact Section */}
                <div className="p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-4">Contact Section</h2>
                    <div className="space-y-4">
                        {/* Contact Details */}
                        <textarea
                            name="contactName"
                            value={formData.home.contactName || ""}
                            onChange={(e) => handleChange(e, "home", "contactName")}
                            placeholder="Contact Name"
                            className="w-full p-2 border rounded"
                        ></textarea>

                        <textarea
                            name="contactPhone"
                            value={formData.home.contactPhone || ""}
                            onChange={(e) => handleChange(e, "home", "contactPhone")}
                            placeholder="Contact Phone"
                            className="w-full p-2 border rounded"
                        ></textarea>

                        <textarea
                            name="contactEmail"
                            value={formData.home.contactEmail || ""}
                            onChange={(e) => handleChange(e, "home", "contactEmail")}
                            placeholder="Contact Email"
                            className="w-full p-2 border rounded"
                        ></textarea>

                        <textarea
                            name="contactAddress"
                            value={formData.home.contactAddress || ""}
                            onChange={(e) => handleChange(e, "home", "contactAddress")}
                            placeholder="Contact Address"
                            className="w-full p-2 border rounded"
                        ></textarea>

                        <textarea
                            name="contactWebsite"
                            value={formData.home.contactWebsite || ""}
                            onChange={(e) => handleChange(e, "home", "contactWebsite")}
                            placeholder="Contact Website"
                            className="w-full p-2 border rounded"
                        ></textarea>

                        {/* Generate vCard Button */}
                        <button
                            type="button"
                            onClick={handleGenerateVCard}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Generate vCard
                        </button>

                        {/* Download vCard Button */}
                        {/* <button
                            type="button"
                            onClick={handleDownloadVCard}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Download vCard
                        </button> */}
                    </div>
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
