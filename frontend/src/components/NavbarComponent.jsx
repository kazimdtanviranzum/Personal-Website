import React from "react";
import {
  Navbar,

  Typography,

  IconButton,
 
  Collapse,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";



const navmenuList = [


  {
    name: 'Experience',
    path: '/experience'
  },
  {
    name: 'Publications',
    path: '/publications'
  },
  {
    name: 'Scholarship & Awards',
    path: '/scholarship_awards'
  },
  {
    name: 'Research',
    path: '/research'
  },
  {
    name: 'News',
    path: '/news'
  },

]

const NavbarComponent = () => {
  const [openNav, setOpenNav] = React.useState(false);


  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-4">

      {
        navmenuList?.map(item => (
          <Typography
            key={item?.path}
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link to={`${item?.path}`} className="flex items-center">
              {item?.name}
            </Link> 

            
          </Typography>
        ))
      }



    </ul>
  );

  return (
    <div className="max-h-[768px] w-full">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900 w-full container mx-auto">
          <Link
          
            to="/"
            className="mr-4 cursor-pointer py-1.5 font-bold capitalize text-xl"
          >
            Kazi Md. Tanvir Anzum
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Link
                to="/admin"
                className="hidden lg:inline-block px-3 py-1 text-sm font-medium text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-md transition-colors"
              >
                Admin
              </Link>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            
          </div>
        </Collapse>
      </Navbar>

    </div>
  );
}



export default NavbarComponent;