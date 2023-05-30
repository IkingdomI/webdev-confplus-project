function Footer() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center">
          <div className="flex justify-center">
            <img
              alt="shape-for-logo"
              src="https://static.overlay-tech.com/assets/9a55634b-39b2-4337-8d0b-50a20ee617b1.svg"
            />
            <img
              alt="logo-title"
              src="https://static.overlay-tech.com/assets/3f5c369f-42af-49c3-9909-76c00cf7a166.png"
            />
          </div>
          <p>Thanks for visiting our website. You can email us </p> <a href="">@ConfPlus.qu.edu.qa</a>
        </div>
        <div>
            <h4>Quick Links</h4>
            <div>
                <ul className="flex flex-col items-center">
                    <li><a  href="">Join us</a></li>
                    <li><a href="">About us</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </div>
        </div>
        <div>
            <h4>Communication</h4>
            <ul className="flex flex-col items-center">
                <li><a href="">Facebook</a></li>
                <li><a href="">Twitter</a></li>
                <li><a href="">Instagram</a></li>
            </ul>
        </div>
      </div>
      <div>
        &copy; Copyright 2023 <a href="">CMPS350 Web Dev</a>
      </div>
    </div>
  );
}

export default Footer;
