import React, { useEffect } from "react";
import PdfViewerMenu from "../../components/PdfViewerMenu";

import { useDispatch, useSelector } from "react-redux";
const ShopMenu = () => {
   const formData = useSelector((state) => state.formData);
  return (
    <div className="w-full m-auto border-lg">
    <div className="flex justify-between items-center my-4 w-[90%] ms-2 mb-7">
    <pre
        className="text-left text-3xl text-black"
        style={{
          fontFamily: " 'Abril Fatface', serif",
          fontWeight: "400",
        }}
      >
        {"Make your tastebud's\nfeel gooood..."}
      </pre>
      <img src="/icons/image 2.png" className="w-12" alt="" />
    </div>
      <PdfViewerMenu url={`${process.env.REACT_APP_BASE_URL}${formData.home.section4Pdf}`} />
    </div>
  );
};

export default ShopMenu;
