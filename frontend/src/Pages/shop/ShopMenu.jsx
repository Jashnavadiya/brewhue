import React, { useEffect } from "react";
import PdfViewer from "../../components/PdfViewer";

const ShopMenu = () => {

  return (
    <div className="w-11/12 m-auto border-lg overflow-hidden ">
      <PdfViewer url="/lamensa.pdf" />
    </div>
  );
};

export default ShopMenu;
