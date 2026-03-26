import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer position="top-right" aria-label="Notifications" />
      </body>
    </html>
  );
}
