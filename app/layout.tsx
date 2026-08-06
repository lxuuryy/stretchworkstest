import type { Metadata } from "next";
import Script from "next/script";
import { Raleway, Open_Sans } from "next/font/google";
import "./globals.css";
// import ChatWidget from "./chat/ChatWidget"; // hidden for now

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "StretchWorks — Performance Mobility Studio",
  description: "1-on-1 assisted stretching for athletes and active adults. Recover faster, move better, stay in the game.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} ${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        {/* <ChatWidget /> */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "wipay42e5e");`}
        </Script>
      </body>
    </html>
  );
}
