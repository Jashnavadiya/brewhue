import React, { useState, useEffect,useMemo  } from "react";
import { Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
import {
  Outlet,
  useParams,
  Link,
  useLocation,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import LoadingScreen from "../../components/Loadingscreen";
import "./ShopDetails.css";
import AddShop from "../lasans/AddShop";
import ShopHome from "./ShopHome";
import ShopMenu from "./ShopMenu";
import ShopAbout from "./ShopAbout";
import ShopSocial from "./ShopSocial";
import { useSelector } from "react-redux";

export default function App() {
  const [selected, setSelected] = useState("Home");
  const formData = useSelector((state) => state.formData);
  const { shopName } = useParams();
  const memoizedComponents = useMemo(() => {
    return {
      Home: <ShopHome />,
      Menu: <ShopMenu />,
      Social: <ShopSocial />,
    };
  }, []);
  const [isMenu, setIsMenu] = useState(false); // State to track if "Menu" tab is selected
  const nav = useNavigate();

  useEffect(() => {
   
  }, [selected]);

  return (
    <div className="w-full min-h-[100vh] relative border-sm bg-[#e4e3dd]">
      {/* <div
        className="absolute top-0 left-0 w-full h-full bg-cover opacity-10 z-0"
        style={{
          backgroundImage:
            "url('/texture/vecteezy_grunge-dots-and-points-texture-background-abstract-grainy_22934526.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "100vw 100vh",
          backgroundPosition: `${Math.random() > 0.5 ? "top" : "bottom"} ${
            Math.random() > 0.5 ? "left" : "right"
          }`,
          transform: `${Math.random() > 0.5 ? "scaleX(1)" : "scaleX(-1)"} ${
            Math.random() > 0.5 ? "scaleY(1)" : "scaleY(-1)"
          }`,
        }}
      ></div> */}

      <div>
        <motion.img
          src={`${process.env.REACT_APP_BASE_URL}${formData.home.logo}`} 
          className={`w-3/12 m-auto py-5 sm:w-5/12 lg:w-2/12 xl:w-2/12 2xl:w-[12%] transition-all duration-300`}
          alt="Responsive Image"
        />
      </div>

      {/* <div className="flex w-full flex-col">
        <Tabs
          fullWidth
          aria-label="Options"
          className="m-auto w-[98%] px-1"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab
            key="Home"
            title="Home"
            className="shadow-none [&_[data-slot='cursor']]:shadow-none [&_[data-slot='cursor']]:text-red-500 [&_[data-slot='cursor']]:outline-none [&_[data-slot='cursor']]:bg-[#e4e3dc] "
          >
            {memoizedComponents["Home"]}
          </Tab>
       
          <Tab
            key="Menu"
            title="Menu"
            className="!shadow-none [&_[data-slot='cursor']]:shadow-none [&_[data-slot='cursor']]:outline-none [&_[data-slot='cursor']]:bg-[#e4e3dc]"
            onClick={() => setIsMenu(true)} // Set the isMenu state to true when "Menu" tab is clicked
          >
            {memoizedComponents["Menu"]}
          </Tab>
          <Tab
            key="Social Media"
            title="Social"
            className="!shadow-none [&_[data-slot='cursor']]:shadow-none [&_[data-slot='cursor']]:outline-none [&_[data-slot='cursor']]:bg-[#e4e3dc]"
          >
            {memoizedComponents["Social"]}
          </Tab>
        </Tabs>
      </div> */}

<div className="flex w-full flex-col">
      {/* Tabs Navigation */}
      <Tabs
        fullWidth
        aria-label="Options"
        className="m-auto w-[98%] px-1 "
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key)}
      >
        <Tab
          key="Home"
          title="Home"
          className="shadow-none text-[14px] max-mobiles:text-[12px] max-mobilem:text-[13px] max-mobilel:text-[14px] [&_[data-slot='cursor']]:shadow-none [&_[data-slot='cursor']]:text-red-500 [&_[data-slot='cursor']]:outline-none [&_[data-slot='cursor']]:bg-[#e4e3dc]"
        />
        <Tab
          key="Menu"
          title="Menu"
          className="!shadow-none text-[14px] max-mobiles:text-[12px] max-mobilem:text-[13px] max-mobilel:text-[14px] [&_[data-slot='cursor']]:shadow-none [&_[data-slot='cursor']]:outline-none [&_[data-slot='cursor']]:bg-[#e4e3dc]"
        />
        <Tab
          key="Social"
          title="Social"
          className="!shadow-none text-[14px] max-mobiles:text-[12px] max-mobilem:text-[13px] max-mobilel:text-[14px] [&_[data-slot='cursor']]:shadow-none [&_[data-slot='cursor']]:outline-none [&_[data-slot='cursor']]:bg-[#e4e3dc]"
        />
      </Tabs>

      {/* Tab Content */}
      <div className="m-auto w-[98%] px-1 mt-3">
        {/* Render all components but only display the active one */}
        <div style={{ display: selected === "Home" ? "block" : "none" }}>
          <ShopHome />
        </div>
        <div style={{ display: selected === "Menu" ? "block" : "none" }}>
          <ShopMenu />
        </div>
        <div style={{ display: selected === "Social" ? "block" : "none" }}>
          <ShopSocial />
        </div>
      </div>
    </div>

      <div className="mt-5 bg-black pt-16">
        <div className="w-5/12 m-auto">
          <div>
            <div
              className="text-white text-sm "
              style={{
                fontFamily: " 'Abril Fatface', serif",
                fontWeight: "400",
              }}
            >
              Made With Love
            </div>
            <img className="w-full mt-3" src="/images/brewhue.png" alt="" />
            <div
              className="my-5 text-white"
              style={{
                fontFamily: " 'Abril Fatface', serif",
                fontWeight: "400",
              }}
            >
              X
            </div>
            <img
              className="w-7/12 m-auto"
              src={`${process.env.REACT_APP_BASE_URL}${formData.home.darkLogo}`} 
              alt=""
            />
          </div>
          <pre
            className="text-[10px] text-white opacity-45 mt-20"
            style={{
              fontFamily: " 'Inria Serif', serif",
              fontWeight: "400",
            }}
          >
            {
              "BrewHue Cafe Networks. - Surat\n© CYPHER IT SOLUTIONS\n*T&C - Policy Page\n2025-27\n\n"
            }
          </pre>
        </div>
      </div>
      {/* <Outlet/> */}
    </div>
  );
}
