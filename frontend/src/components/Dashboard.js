// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//   const [shop, setShop] = useState(null);
//   const [newWidget, setNewWidget] = useState({ name: '', logo: '', link: '' });
//   const [editWidget, setEditWidget] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     const fetchShop = async () => {
//       try {
//         const res = await axios.get('https://brewhue.onrender.com/api/shops/enso');
//         setShop(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchShop();
//   }, []);

//   // Add Widget
//   const handleAddWidget = async () => {
//     try {
//       const res = await axios.post(`https://brewhue.onrender.com/api/shops/<shopId>/widgets`, newWidget);
//       setShop({ ...shop, widgets: res.data });
//       setNewWidget({ name: '', logo: '', link: '' });
//       alert('Widget added successfully');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to add widget');
//     }
//   };

//   // Edit Widget
//   const handleEditWidget = async () => {
//     try {
//       const res = await axios.put(`https://brewhue.onrender.com/api/shops/<shopId>/widgets/${editWidget._id}`, editWidget);
//       setShop({
//         ...shop,
//         widgets: shop.widgets.map((w) => (w._id === editWidget._id ? res.data : w)),
//       });
//       setIsEditMode(false);
//       setEditWidget(null);
//       alert('Widget updated successfully');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update widget');
//     }
//   };

//   // Remove Widget
//   const handleRemoveWidget = async (widgetId) => {
//     try {
//       await axios.delete(`https://brewhue.onrender.com/api/shops/<shopId>/widgets/${widgetId}`);
//       setShop({
//         ...shop,
//         widgets: shop.widgets.filter((w) => w._id !== widgetId),
//       });
//       alert('Widget removed successfully');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to remove widget');
//     }
//   };

//   if (!shop) return <p>Loading...</p>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-4xl font-bold mb-8">Shop Dashboard</h1>
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold">{shop.name}</h2>
//         <img src={shop.profile} alt="Shop profile" className="w-32 h-32 rounded-full mt-4" />

//         {/* Widgets */}
//         <h3 className="text-xl font-medium mt-4">Widgets</h3>
//         <div className="space-y-4">
//           {shop.widgets.map((widget) => (
//             <div key={widget._id} className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
//               <img src={widget.logo} alt={widget.name} className="w-12 h-12 rounded-full" />
//               <a href={widget.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//                 {widget.name}
//               </a>
//               <button
//                 onClick={() => handleRemoveWidget(widget._id)}
//                 className="text-red-500"
//               >
//                 Remove
//               </button>
//               <button
//                 onClick={() => {
//                   setIsEditMode(true);
//                   setEditWidget(widget);
//                 }}
//                 className="text-yellow-500"
//               >
//                 Edit
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Add Widget Form */}
//         <div className="mt-6">
//           <h4 className="text-lg font-medium">Add New Widget</h4>
//           <input
//             type="text"
//             value={newWidget.name}
//             onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
//             className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
//             placeholder="Widget Name"
//           />
//           <input
//             type="text"
//             value={newWidget.logo}
//             onChange={(e) => setNewWidget({ ...newWidget, logo: e.target.value })}
//             className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
//             placeholder="Widget Logo URL"
//           />
//           <input
//             type="url"
//             value={newWidget.link}
//             onChange={(e) => setNewWidget({ ...newWidget, link: e.target.value })}
//             className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
//             placeholder="Widget Link"
//           />
//           <button
//             onClick={handleAddWidget}
//             className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
//           >
//             Add Widget
//           </button>
//         </div>

//         {/* Edit Widget Form */}
//         {isEditMode && editWidget && (
//           <div className="mt-6">
//             <h4 className="text-lg font-medium">Edit Widget</h4>
//             <input
//               type="text"
//               value={editWidget.name}
//               onChange={(e) => setEditWidget({ ...editWidget, name: e.target.value })}
//               className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
//               placeholder="Widget Name"
//             />
//             <input
//               type="text"
//               value={editWidget.logo}
//               onChange={(e) => setEditWidget({ ...editWidget, logo: e.target.value })}
//               className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
//               placeholder="Widget Logo URL"
//             />
//             <input
//               type="url"
//               value={editWidget.link}
//               onChange={(e) => setEditWidget({ ...editWidget, link: e.target.value })}
//               className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
//               placeholder="Widget Link"
//             />
//             <button
//               onClick={handleEditWidget}
//               className="mt-4 p-2 bg-green-500 text-white rounded-lg"
//             >
//               Update Widget
//             </button>
//             <button
//               onClick={() => setIsEditMode(false)}
//               className="mt-4 p-2 bg-gray-500 text-white rounded-lg"
//             >
//               Cancel Edit
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams ,useLocation} from "react-router-dom";

const Dashboard = () => {
  const [shop, setShop] = useState(null);
  const [widgets, setWidgets] = useState([]); // Store widgets here
  const [newWidget, setNewWidget] = useState({ name: '', logo: '', link: '' });
  const [editWidget, setEditWidget] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const {shopName} =useParams()

  useEffect(() => {
    const fetchShopAndWidgets = async () => {
      try {
        // Fetch the shop info
        const shopRes = await axios.get(`https://brewhue.onrender.com/api/${shopName}/shop`);
        setShop(shopRes.data);

        // Fetch the widgets associated with the shop
        const widgetsRes = await axios.get(`https://brewhue.onrender.com/api/${shopName}/widgets`);
        setWidgets(widgetsRes.data); // Store widgets in state
      } catch (err) {
        console.error(err);
      }
      
    };
    console.log(shopName,shop,widgets);
    
    fetchShopAndWidgets();
  }, []);

  // Add Widget
  const handleAddWidget = async () => {
    try {
      const res = await axios.post(`https://brewhue.onrender.com/api/${shopName}/widgets`, newWidget);
      setWidgets([...widgets, res.data]); // Add the new widget to the list
      setNewWidget({ name: '', logo: '', link: '' });
      alert('Widget added successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to add widget');
    }
  };

  // Edit Widget
  const handleEditWidget = async () => {
    try {
      const res = await axios.put(`https://brewhue.onrender.com/api/${shopName}/widgets/${editWidget._id}`, editWidget);
      setWidgets(
        widgets.map((w) => (w._id === editWidget._id ? res.data : w)) // Update widget in the list
      );
      setIsEditMode(false);
      setEditWidget(null);
      alert('Widget updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update widget');
    }
  };

  // Remove Widget
  const handleRemoveWidget = async (widgetId) => {
    try {
      await axios.delete(`https://brewhue.onrender.com/api/${shopName}/widgets/${widgetId}`);
      setWidgets(widgets.filter((w) => w._id !== widgetId)); // Remove widget from the list
      alert('Widget removed successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to remove widget');
    }
  };

  if (!shop) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Shop Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold">{shop.name}</h2>
        <img src={shop.profile} alt="Shop profile" className="w-32 h-32 rounded-full mt-4" />

        {/* Widgets */}
        <h3 className="text-xl font-medium mt-4">Widgets</h3>
        <div className="space-y-4">
          {widgets.map((widget) => (
            <div key={widget._id} className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
              <img src={widget.logo} alt={widget.name} className="w-12 h-12 rounded-full" />
              <a href={widget.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {widget.name}
              </a>
              <button onClick={() => handleRemoveWidget(widget._id)} className="text-red-500">
                Remove
              </button>
              <button
                onClick={() => {
                  setIsEditMode(true);
                  setEditWidget(widget);
                }}
                className="text-yellow-500"
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        {/* Add Widget Form */}
        <div className="mt-6">
          <h4 className="text-lg font-medium">Add New Widget</h4>
          <input
            type="text"
            value={newWidget.name}
            onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Widget Name"
          />
          <input
            type="text"
            value={newWidget.logo}
            onChange={(e) => setNewWidget({ ...newWidget, logo: e.target.value })}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Widget Logo URL"
          />
          <input
            type="url"
            value={newWidget.link}
            onChange={(e) => setNewWidget({ ...newWidget, link: e.target.value })}
            className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Widget Link"
          />
          <button
            onClick={handleAddWidget}
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
          >
            Add Widget
          </button>
        </div>

        {/* Edit Widget Form */}
        {isEditMode && editWidget && (
          <div className="mt-6">
            <h4 className="text-lg font-medium">Edit Widget</h4>
            <input
              type="text"
              value={editWidget.name}
              onChange={(e) => setEditWidget({ ...editWidget, name: e.target.value })}
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Widget Name"
            />
            <input
              type="text"
              value={editWidget.logo}
              onChange={(e) => setEditWidget({ ...editWidget, logo: e.target.value })}
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Widget Logo URL"
            />
            <input
              type="url"
              value={editWidget.link}
              onChange={(e) => setEditWidget({ ...editWidget, link: e.target.value })}
              className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Widget Link"
            />
            <button
              onClick={handleEditWidget}
              className="mt-4 p-2 bg-green-500 text-white rounded-lg"
            >
              Update Widget
            </button>
            <button
              onClick={() => setIsEditMode(false)}
              className="mt-4 p-2 bg-gray-500 text-white rounded-lg"
            >
              Cancel Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
