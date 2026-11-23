import type { Metadata } from "next";
export const metadata:Metadata={title:"SABOCON Redaktion",robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="de"><body style={{margin:0}}>{children}</body></html>;}
