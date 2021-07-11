import "./Layout.scss";

const Layout = (props) => {
  return (
    <main className="app-wrapper-secondary">
       {props.children}
    </main>
  );
};

export default Layout;
