function Footer() {
  return (
    <footer className="flex flex-col items-center w-full">
      <div className=" p-7 flex flex-col items-center gap-3 md:flex-row md:gap-8 md:justify-between w-full max-w-4xl">
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-1">
            <img
              alt="shape-for-logo"
              src="https://static.overlay-tech.com/assets/9a55634b-39b2-4337-8d0b-50a20ee617b1.svg"
            />
            <img
              alt="logo-title"
              src="https://static.overlay-tech.com/assets/3f5c369f-42af-49c3-9909-76c00cf7a166.png"
            />
          </div>
          <p>Thanks for visiting our website. You can email us </p>{" "}
          <a className="text-blue-700" href="">@ConfPlus.qu.edu.qa</a>
        </div>
        <div>
          <h4>Quick Links</h4>
          <div>
            <ul className="flex flex-col items-center">
              <li>
                <a href="">Join us</a>
              </li>
              <li>
                <a href="">About us</a>
              </li>
              <li>
                <a href="">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h4>Communication</h4>
          <ul className="flex flex-col items-center">
            <li>
              <a href="">Facebook</a>
            </li>
            <li>
              <a href="">Twitter</a>
            </li>
            <li>
              <a href="">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="md:text-center">
        &copy; Copyright 2023 <a className="text-blue-700" href="">CMPS350 Web Dev</a>
      </div>
    </footer>
  );
}

export default Footer;
