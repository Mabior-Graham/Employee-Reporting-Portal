import { NextRequest } from "next/server";
import Navigation from "./components/navbar";
import Hero from "./components/hero";
import Footer from "./components/footer";


export default function page(request: NextRequest) {
  

   
  return (
   <>
      <Navigation />
      <Hero />
      <Footer />
   </>
  )
}

