import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import NewsletterSection from "./_components/NewsletterSection";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className='p-10 md:px-36 lg:px-48'>
        <ProductList />
      </div>
      <NewsletterSection />
    </div>
  );
}
