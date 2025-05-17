import Background from "./Background";
import SlideBar from "./SlideBar";

function Layout({ children }) {
  return (
    <div>
      {children}
      <Background />
      <SlideBar />
    </div>
  );
}

export default Layout;
