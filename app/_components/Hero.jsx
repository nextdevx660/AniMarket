import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-anime-purple/10 to-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 animate-fade-in">

        {/* Left Content */}
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-anim-dark leading-tight">
            Discover Amazing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-anime-purple to-anime-pink">
              Anime Digital
            </span>{' '}
            Products
          </h1>
          <p className="mt-6 text-anime-dark/70 text-base sm:text-lg md:text-xl">
            Browse our collection of premium digital anime art, wallpapers, illustrations, and more. Created by talented artists for true fans.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/dashboard" className="px-6 py-3 bg-anime-purple text-white font-medium rounded-lg shadow hover:bg-anime-purple/90 transition">
              Browse All Products
            </Link>
            <Link href="/explore" className="px-6 py-3 border border-anime-purple text-anime-dark font-medium rounded-lg hover:shadow">
              Explore Categories
            </Link>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-anime-purple font-medium justify-center lg:justify-start">
            <span>✔ Instant Downloads</span>
            <span>✔ Secure Payments</span>
            <span>✔ Premium Quality</span>
          </div>
        </div>

        {/* Right Floating Images */}
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg h-[300px] sm:h-[360px] md:h-[400px] m-auto">

          {/* Image 1 */}
          <div className="absolute top-[20%] left-[0] sm:left-[10%] md:left-[10%] w-60 h-60 sm:w-50 sm:h-50 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-xl animate-float-up z-10">
            <Image
              src="/trace.png"
              alt="Anime Art"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>

          {/* Image 2 */}
          <div className="absolute top-[40%] right-[0] sm:right-[10%] md:right-[10%] w-60 h-60 sm:w-50 sm:h-50 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl animate-float-down z-10">
            <Image
              src="/wood.png"
              alt="Woody Toy"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>

          {/* Circle Badge */}
          <div className="absolute top-[60%] left-[40%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-anime-purple to-anime-pink text-white text-sm font-semibold w-[200px] h-[200px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] flex items-center justify-center rounded-full shadow-lg z-20 opacity-80">
            <h2 className="text-base sm:text-lg md:text-xl font-bold">500+ Products</h2>
          </div>
        </div>


      </div>
    </section>
  );
}
