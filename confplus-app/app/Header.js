function Header() {
  return (
    <header className="flex flex-col">
      {/* <h1 className="text-center">ConfPlus</h1> */}
      <div className="flex gap-1 justify-center">
        <img
          alt="shape-for-logo"
          src="https://static.overlay-tech.com/assets/9a55634b-39b2-4337-8d0b-50a20ee617b1.svg"
        />
        <img
          alt="logo-title"
          src="https://static.overlay-tech.com/assets/3f5c369f-42af-49c3-9909-76c00cf7a166.png"
        />
      </div>
      <nav>
        <ul className="flex flex-col content-center text-center">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
