import React from "react";
import { InstagramEmbed } from "react-social-media-embed";
import { useSelector } from "react-redux";
import "./ShopSocial.css";
const ShopSocial = () => {
  const formData = useSelector((state) => state.formData);
   // Handle link clicks
   const handleLinkClick = (url) => {
    if (url) {
        window.open(url, '_blank'); // Open link in a new tab
    }
};
  return (
    <div className="w-full m-auto border-lg  ">
      <div className="flex justify-between items-center ms-2 w-[90%] my-4 mb-7">
        <pre
          className="text-left text-2xl max-mobiles:text-lg max-mobilem:text-xl max-mobilel:text-2xl text-black"
          style={{
            fontFamily: " 'Abril Fatface', serif",
            fontWeight: "400",
          }}
        >
          {"Something, some-things "}
        </pre>
        <img src="/icons/image 3.png" className="w-16" alt="" />
      </div>
      <div className="space-y-6">
  
            
            <div className="flex flex-wrap">
                {formData.social.links.map((link, index) => (
                    <div
                        key={index}
                        className="flex flex-col w-1/3 px-[1%] items-center"
                        onClick={() => handleLinkClick(link.url)}
                    >
                        {/* Display the platform's icon */}
                        <img
                            src={`${process.env.REACT_APP_BASE_URL}${link.icon}`|| 'default-icon.png'} // Placeholder icon if no icon is provided
                            alt={link.name}
                            className=" w-1/2 m-auto cursor-pointer"
                        />
                        {/* Display the platform's name */}
                        <p className="text-lg text-center"  style={{
                          fontFamily: " 'Inria Serif', serif",
                          fontWeight: "400",
                        }}>{link.name}</p>
                    </div>
                ))}
            </div>
        </div>
      {/* <div className="masonry-layout mt-5">
        {posts.map((post, index) => (
          <div key={index} className="masonry-item">
            <InstagramEmbed
              url={post}
              width="100%"
              height={"100%"}
              captioned={false}
            />
          </div>
        ))}
      </div> */}
      {/* Instagram Posts Section */}
      <div className="masonry-layout mt-5">
        {formData.social.insta &&
          formData.social.insta.map((post, index) => (
            <div key={index} className="masonry-item">
              <InstagramEmbed
                url={post}
                width="100%"
                height="100%"
                captioned={false}
              />
            </div>
          ))}
      </div>

      {/* Additional Social Media Sections (Facebook, Twitter, etc.) */}
      {/* <div className="mt-10">
     
        <div className="space-y-2">
          {Object.entries(formData.social).map(([platform, links]) => {
            if (platform === "insta") return null; // Skip Instagram, already displayed

            return (
              <div key={platform}>
                <h3 className="text-lg font-semibold">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </h3>
                <ul className="list-disc pl-6">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div> */}
      {/* <script async src="https://www.instagram.com/embed.js"></script> */}
    </div>
  );
};

export default ShopSocial;
