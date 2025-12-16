import { useState, useEffect } from "react";
import GlassIcons from "../component/GlassIcons";
// import {
//   FiFileText,
//   FiBook,
//   FiHeart,
//   FiCloud,
//   FiEdit,
//   FiBarChart2
// } from 'react-icons/fi';
import { FiBook } from "react-icons/fi";

import { getCollections } from "../api/booksApi";

export default function Collections() {
  const [collections, setCollections] = useState([]);

    // console.log(collections);
  
    useEffect(() => {
      async function fetchCollections() {
        try {
          const res = await getCollections();
          const collections = (res.data.collections ?? [])
  .filter(col => col && col.collection)
  .sort((a, b) => a.collection.localeCompare(b.collection));
          // console.log('data api', res);
          // console.log(collections);
          
          setCollections(collections);
        } catch (err) {
          console.error("Failed to load books:", err);
        }
      }
  
      fetchCollections();
    }, []);


  //   const iconMap = {
  //   "Science Fiction": <FiBook />,
  //   "Romance": <FiHeart />,
  //   "History": <FiFileText />
  // };

  // const items = collections.map((col) => ({
  //   icon: iconMap[col.name] || <FiBook />,
  //   color: "#5227FF",
  //   label: col.name
  // }));

  const items = collections.map((col) => ({
    icon: <FiBook size={50}/>,
    color: "#2fb9dcff",
    label: col.collection,
  }));

  //   const items = [
  //   { icon: <FiFileText />, color: 'blue', label: 'Files' },
  //   { icon: <FiBook />, color: 'purple', label: 'Books' },
  //   { icon: <FiHeart />, color: 'red', label: 'Health' },
  //   { icon: <FiCloud />, color: 'indigo', label: 'Weather' },
  //   { icon: <FiEdit />, color: 'orange', label: 'Notes' },
  //   { icon: <FiBarChart2 />, color: 'green', label: 'Stats' },
  // ];

  return (
    <div className="collections">
      {/* Collections */}
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <GlassIcons items={items} className="custom-class" />
      </div>
    </div>
  );
}
