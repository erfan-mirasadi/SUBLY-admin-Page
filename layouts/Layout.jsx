import Background from "@/components/Background";
import SlideBar from "@/components/SlideBar";

function Layout({ children }) {
  return (
    <div className="bg-[#1B1B2E] min-h-screen overflow-hidden">
      <Background />
      <div className="lg:ml-[215px]">
        <div className="relative z-10">{children}</div>
      </div>
      <SlideBar />
    </div>
  );
}

export default Layout;
