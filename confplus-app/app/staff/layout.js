import Header from "../Header.js";
import { redirect } from "next/navigation";



export default function StaffLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <footer>bye</footer>
    </>
  );
}
