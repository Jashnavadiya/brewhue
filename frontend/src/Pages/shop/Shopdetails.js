import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import LoadingScreen from '../../components/Loadingscreen';

const ShopPage = () => {
  const { shopName } = useParams();
  const [shopData, setShopData] = useState(null);
  const [iconsData, setIconsData] = useState(null);

  useEffect(() => {
    if (shopName) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/shop`)
        .then((res) => setShopData(res.data))
        .catch((err) => console.error('Error fetching shop data', err));

      axios.get(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/widgets`)
        .then((res) => setIconsData(res.data))
        .catch((err) => console.error('Error fetching widgets data', err));
    }
  }, [shopName]);

  const MainContent = () => {
    if (!shopData || !iconsData) {
      return <div>Loading...</div>;
    }

    return (
      <div className="w-screen h-screen relative">
        {/* Background Image */}
        <img
          src="https://scontent.famd1-3.fna.fbcdn.net/v/t39.30808-6/308099663_602028755046212_7532508445192691432_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=0mwk_ZhCregQ7kNvgEbAaHX&_nc_zt=23&_nc_ht=scontent.famd1-3.fna&_nc_gid=AQwB3aInkFN94xygztZ4XRQ&oh=00_AYDvyLyiPid3r3NHDIlsy086mS-0_IHCT6yah7kCRlUEpw&oe=678002AD"
          alt="Background"
          className="w-full h-full object-cover"
        />

        {/* Glass Effect Overlay */}
        <div className="absolute flex top-0 left-0 w-full h-full bg-white bg-opacity-10 backdrop-blur-md">
          <div className="min-h-[97vh] w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto rounded-2xl relative shadow-[#E1E1E1] p-6 bg-[#FAFAFA]">
            <img src={shopData.profile} alt={shopData.name} className="w-24 h-24 sm:w-36 sm:h-36 rounded-full m-auto" />
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">{shopData.name}</h1>
            <p className="mt-4 mb-6 text-sm sm:text-base text-center">{shopData.description}</p>

            <div className="text-center font-sans">
              <hr className="my-6 border-gray-300" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-center">
                {iconsData.map((icon) => (
                  <a target='_blank' href={icon.link} key={icon.id} rel="noreferrer">
                    <div className="flex flex-col items-center bg-[#FAFAFA] p-4 rounded-lg shadow-sm shadow-[#B8B8B8] max-w-xs mx-auto">
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
                        <img src={icon.logo} alt={icon.name} className="w-full h-full rounded" />
                      </div>
                      <div className="flex items-center justify-center mt-2 sm:mt-0 w-full">
                        <h3 className="text-[#4F4F4F] text-sm sm:text-base text-center w-full">{icon.name}</h3>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="absolute bottom-2 left-0 text-xs sm:text-sm text-center w-full">Powered by lasans</div>
          </div>
        </div>
      </div>
    );
  };

  return <LoadingScreen OgComponent={MainContent} />;
};

export default ShopPage;
