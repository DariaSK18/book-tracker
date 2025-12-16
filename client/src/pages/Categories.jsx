import Folder from '../component/Folder'
import GlassIcons from '../component/GlassIcons'
import { 
  FiFileText, 
  FiBook, 
  FiHeart, 
  FiCloud, 
  FiEdit, 
  FiBarChart2 
} from 'react-icons/fi';


export default function Categories() {

  const items = [
  { icon: <FiFileText />, color: 'blue', label: 'Files' },
  { icon: <FiBook />, color: 'purple', label: 'Books' },
  { icon: <FiHeart />, color: 'red', label: 'Health' },
  { icon: <FiCloud />, color: 'indigo', label: 'Weather' },
  { icon: <FiEdit />, color: 'orange', label: 'Notes' },
  { icon: <FiBarChart2 />, color: 'green', label: 'Stats' },
];

  return (
    <div className="categories">
      Categories
      {/* <div style={{ width: '100%', height: '100px', position: 'relative' }}>
  <Folder size={1} color="#274fffff" className="custom-folder" />
</div> */}
<div style={{ width: '100%', height: '400px', position: 'absolute' }}>
  <GlassIcons items={items} className="custom-class"/>
</div>
    </div>
  );
}