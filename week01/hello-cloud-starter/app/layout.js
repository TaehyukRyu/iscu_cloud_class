import "./globals.css";

export const metadata = {
  title: "Hello Cloud",
  description: "My first cloud deployment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
