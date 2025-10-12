
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

export default function Dashboard() {
return <div className='w-screen h-screen bg-amber-100 flex'>
    <div className='basis-xs bg-white'><Sidebar/>
    </div>
     <div className='flex-1 bg-[#FAFAFA]'><Outlet/>
     </div>
</div>
}