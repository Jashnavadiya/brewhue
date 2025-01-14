import React, { useState, useEffect } from "react";
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

export default function App() {
  const [selected, setSelected] = useState("Home");
  const { shopName } = useParams();
  const [shopData, setShopData] = useState(null);
  const [iconsData, setIconsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenu, setIsMenu] = useState(false); // State to track if "Menu" tab is selected
  const nav = useNavigate();
  useEffect(() => {
    if (shopName) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/shop`)
        .then((res) => setShopData(res.data))
        .catch((err) => console.error("Error fetching shop data", err));

      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/${shopName}/widgets`)
        .then((res) => setIconsData(res.data))
        .catch((err) => console.error("Error fetching widgets data", err));
    }
  }, [shopName]);

  // function usePrevious(value) {
  //   const ref = React.useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }

  // const prevSelected = usePrevious(selected);

  useEffect(() => {
    // if (prevSelected === selected) {
    //   console.log("Same value, no action needed");
    //   return;
    // }
    // const isSame = (prev) => prev === selected; // Simple comparison function
    // console.log(selected);
    // if (isSame(selected)) {
    //   console.log("Same value, no navigation");
    //   return; // Prevent redundant navigation
    // }
    // if (selected === "Menu") {
    //   setIsMenu(true);
    //   nav(`/${shopName}/menu`);
    // } else if (selected === "Home") {
    //   setIsMenu(false);
    //   nav(`/${shopName}/`);
    // } else if (selected === "Contact") {
    //   nav(`/${shopName}/contact`);
    // } else if (selected === "Social") {
    //   nav(`/${shopName}/social`);
    // } else if (selected === "About") {
    //   nav(`/${shopName}/about`);
    // }
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
          src="/enso.png"
          className={`w-3/12 m-auto py-5 sm:w-5/12 lg:w-2/12 xl:w-2/12 2xl:w-[12%] transition-all duration-300`}
          alt="Responsive Image"
        />
      </div>

      <div className="flex w-full flex-col">
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
            <ShopHome />
          </Tab>
          {/* <Tab
            key="About"
            title="About"
            className="!shadow-none [&_[data-slot='cursor']]:shadow-none [&_[data-slot='cursor']]:outline-none [&_[data-slot='cursor']]:bg-[#e4e3dc]"
          >
            <ShopAbout />
          </Tab> */}
          <Tab
            key="Menu"
            title="Menu"
            className="!shadow-none [&_[data-slot='cursor']]:shadow-none [&_[data-slot='cursor']]:outline-none [&_[data-slot='cursor']]:bg-[#e4e3dc]"
            onClick={() => setIsMenu(true)} // Set the isMenu state to true when "Menu" tab is clicked
          >
            <ShopMenu />
          </Tab>
          {/* <Tab
            key="Contact Us"
            title="Contact"
            className="!shadow-none [&_[data-slot='cursor']]:shadow-none [&_[data-slot='cursor']]:outline-none [&_[data-slot='cursor']]:bg-[#e4e3dc]"
          ></Tab> */}
          <Tab
            key="Social Media"
            title="Social"
            className="!shadow-none [&_[data-slot='cursor']]:shadow-none [&_[data-slot='cursor']]:outline-none [&_[data-slot='cursor']]:bg-[#e4e3dc]"
          ></Tab>
        </Tabs>
      </div>

      <div className="mt-10 bg-black pt-16">
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
              src="/images/enso_white.png"
              alt=""
            />
          </div>
          <pre
            className="text-[10px] text-gray-500 mt-20"
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
