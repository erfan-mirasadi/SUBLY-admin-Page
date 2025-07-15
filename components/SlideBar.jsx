import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

const links = [
  {
    title: "dashboard",
    links: [
      {
        name: "currencies",
      },
      {
        name: "coupons",
      },
    ],
  },
  {
    title: "product",
    links: [
      {
        name: "companies",
      },
      {
        name: "categories",
      },
      {
        name: "allProducts",
      },
    ],
  },
  {
    title: "customers",
    links: [
      {
        name: "users",
      },
      {
        name: "orders",
      },
    ],
  },
];

function SlideBar() {
  const [openNavigation, setOpenNavigation] = useState(true);
  const { data: session } = useSession();

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: "/",
      });
      toast.success("خروج موفقیت‌آمیز بود");
    } catch (error) {
      toast.error("خطا در خروج");
    }
  };

  return (
    <div className="flex h-screen">
      <button
        className="fixed top-6 right-6 bg-[#1B1B2E] border-1 border-[#AC6AFF]/90 rounded-full flex lg:hidden items-center justify-center w-14 h-14 group z-40 shadow-xl cursor-pointer"
        onClick={toggleNavigation}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* خط بالا */}
          <span
            className={`absolute left-0 w-full h-[4px] bg-white rounded transition-all duration-500 ${
              openNavigation
                ? "top-1/2 rotate-0 opacity-50 "
                : " top-2 rotate-0"
            }`}
          />
          {/* خط وسط */}
          <span
            className={`absolute left-0 w-full h-[4px] bg-white rounded transition-all duration-400 ${
              openNavigation
                ? "opacity-0"
                : "top-1/2 -translate-y-1/2 opacity-100"
            }`}
          />
          {/* خط پایین */}
          <span
            className={`absolute left-0 w-full h-[4px] bg-white rounded transition-all duration-300 ${
              openNavigation
                ? "top-1/2 -rotate-0 opacity-50"
                : "bottom-2 rotate-0"
            }`}
          />
        </div>
      </button>

      <nav
        className={`${
          openNavigation ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-full w-[215px] backdrop-blur-md lg:translate-x-0 transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="h-full flex flex-col">
          <div className="pt-15 pb-6 px-12 lg:p-6">
            <span className="font-bold text-amber-50 text-3xl">SUBLY</span>
            {session && (
              <div className="mt-4 text-sm text-gray-400">
                <p>Hello🧍🏻{session.user?.name || session.user?.email}</p>
              </div>
            )}
          </div>
          <div className="flex-1 overflow-y-auto px-9">
            <div className="absolute top-0 left-50 w-[1px] h-full bg-[#252134] blur-xs pointer-events-none"></div>
            {links.map((item) => (
              <div key={item.title} className="mb-6">
                <Link href={`/${item.title}`}>
                  <p className="text-gray-400 uppercase hover:text-[#AC6AFF]/50 cursor-pointer mb-3">
                    {item.title}
                  </p>
                </Link>
                <div className="space-y-3 pr-3.5">
                  {item.links.map((link) => (
                    <div key={link.name}>
                      <Link href={`/${item.title}/${link.name}`}>
                        <span className="capitalize text-gray-300 cursor-pointer hover:text-[#AC6AFF]/90 block py-2 hover:border hover:border-[#252134] hover:rounded-2xl text-center">
                          {link.name}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-6">
            <button
              onClick={handleLogout}
              className="w-full text-gray-300 hover:text-[#AC6AFF]/90 block py-2 hover:border font-extrabold hover:border-[#252134] hover:rounded-2xl text-center cursor-pointer"
            >
              SignOut 👋🏼
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SlideBar;
