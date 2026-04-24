import "./globals.css";

export const metadata = {
  title: "Skip The Agent",
  description: "Sell smart. Settle safe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
