import { Search } from 'lucide-react';
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';


const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState(''); // State to hold search input
    const navigate = useNavigate();

        const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission if it were a form
        if (searchQuery.trim()) { // Only navigate if there's a non-empty query
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery(''); // Clear search bar after navigating
        }
    };


  return (
    <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">
      
      <Link to={"/"}>        
      <img src={Logo} alt="Logo" className="w-50 cursor-pointer brightness-125" />
      </Link>


        <ul className="hidden xl:flex space-x-6">
          <Link to={"/"}>
            <li className='cursor-pointer hover:text-[#e50914]'>Home</li>
            </Link>

            <Link to={"Movies"}>
              <li className='cursor-pointer hover:text-[#e50914]'>Movies</li>
            </Link>

            <Link to={"TvSeries"}>
            <li className='cursor-pointer hover:text-[#e50914]'>TV shows</li>
            </Link>
              
        </ul>

        <div className="flex items-center space-x-4 relative">

            <div className="relative md:inline-flex">
                <input type="text" className="bg-[#333333] px-4 py-2 rounded-full min-w-72  pr-10 outline-none" 
                placeholder="Search..." 
                value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(e);
                            }
                        }}
                        />
                
                <Search className="absolute top-2 right-4 w-5 h-5"
                onClick={handleSearch}
                />
            </div>

        </div>
    </nav>
  )
}

export default Navbar