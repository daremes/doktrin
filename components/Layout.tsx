interface Layout {
  children: React.ReactNode;
}

const Layout = ({ children }: Layout) => {
  return (
    <div>
      <nav>something</nav>
      {children}
    </div>
  );
};

export default Layout;
