import { useEffect, useState } from "react";
const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "ecommerce",
      },
    ],
  },

  {
    title: "Pages",
    links: [
      {
        name: "orders",
      },
      {
        name: "employees",
      },
      {
        name: "customers",
      },
    ],
  },
  {
    title: "Apps",
    links: [
      {
        name: "calendar",
      },
      {
        name: "kanban",
      },
      {
        name: "editor",
      },
      {
        name: "color-picker",
      },
    ],
  },
  {
    title: "Charts",
    links: [
      {
        name: "line",
      },
      {
        name: "area",
      },

      {
        name: "bar",
      },
      {
        name: "pie",
      },
      {
        name: "financial",
      },
      {
        name: "color-mapping",
      },
      {
        name: "pyramid",
      },
      {
        name: "stacked",
      },
    ],
  },
];

function SlideBar() {
  const [openNavigation, setOpenNavigation] = useState(true);

  useEffect(() => {
    if (openNavigation) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openNavigation]);

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };
  // bg-[#1B1B2E]
  return (
    <div className="min-h-screen ">
      <div className="flex h-screen">
        <button
          className="fixed top-4 bg-[#93325a] rounded-xl left-4 flex lg:hidden items-center justify-center w-10 h-10 group z-30"
          onClick={toggleNavigation}
        >
          <div className="relative w-6 h-5 left-0 ">
            <span
              className={`absolute left-0 w-full h-[2px] bg-white rounded-sm transition-all duration-300 group-hover:bg-[#AC6AFF]/50 ${
                openNavigation ? "top-[7.5px] rotate-150" : "top-0.5"
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 w-full h-[2px] bg-white rounded-sm transition-all duration-300 group-hover:bg-[#AC6AFF]/80 ${
                openNavigation ? "bottom-[10px] -rotate-150" : "bottom-0.5"
              }`}
            />
          </div>
        </button>

        <nav
          // bg-[#93325a]/30
          className={`${
            openNavigation ? "translate-x-0" : "-translate-x-full"
          } fixed top-0 left-0 h-full w-[215px] backdrop-blur-md lg:translate-x-0 transition-transform duration-300 ease-in-out z-20`}
        >
          <div className="h-full flex flex-col">
            <div className="pt-15 pb-6 px-12 lg:p-6">
              <span className="font-bold text-amber-50 text-3xl">SUBLY</span>
            </div>
            <div className="flex-1 overflow-y-auto px-9">
              <div className="absolute top-0 left-50 w-[1px] h-full bg-[#252134] blur-xs pointer-events-none"></div>
              {links.map((item) => (
                <div key={item.title} className="mb-6">
                  <p className="text-gray-400 uppercase hover:text-[#AC6AFF]/50 cursor-pointer mb-3">
                    {item.title}
                  </p>
                  <div className="space-y-3 pr-3.5">
                    {item.links.map((link) => (
                      <div key={link.name} className="">
                        <span className="capitalize text-gray-300 cursor-pointer hover:text-[#AC6AFF]/90 block py-2 hover:border hover:border-[#252134] hover:rounded-2xl text-center">
                          {link.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default SlideBar;
