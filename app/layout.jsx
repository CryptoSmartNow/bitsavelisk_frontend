'use client'
import { Inter } from "next/font/google";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import { WalletProvider, useInitializeProviders, PROVIDER_ID } from '@txnlab/use-wallet'
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import LuteConnect from 'lute-connect'
import RecoilcontextProvider from "./providers/recoilprovider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
      { id: PROVIDER_ID.EXODUS },
      {
        id: PROVIDER_ID.LUTE,
        clientStatic: LuteConnect,
        clientOptions: { siteName: 'YourSiteName' }
      },
      { id: PROVIDER_ID.KIBISIS }
    ]
  })
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);
  return (
    <html lang="en">
      <WalletProvider value={providers}>
      <RecoilcontextProvider>
        <body className={inter.className}>{children}</body>
      </RecoilcontextProvider>
      </WalletProvider>
      
    </html>
  );
}