import React, { useEffect } from "react";
import PdfViewerMenu from "../../components/PdfViewerMenu";

const ShopMenu = () => {
  return (
    <div className="w-11/12 m-auto border-lg  ">
      <pre
        className="text-left text-2xl text-black"
        style={{
          fontFamily: " 'Abril Fatface', serif",
          fontWeight: "400",
        }}
      >
        {"Make your tastebud's\nfeel gooood..."}
      </pre>
      <PdfViewerMenu url="/lamensa.pdf" />
    </div>
  );
};

export default ShopMenu;
