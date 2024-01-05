import React from 'react';
import ImageSlider from '../../components/ImageSlider';
import ImageCard from '../../components/ImageCard';
import TwoColumnSection from '../../components/TwoColumnSection';
import ProductCard from '../../components/ProductCard';
import Promotion from '../../sections/adverticements/Promotion';
import Discounts from '../../sections/adverticements/Discounts';

const Home = () => {
  return (
    <>
      <div class="container mx-auto">
        {/* carowsal */}
        <ImageSlider />
        {/* shop by category */}
        <div className="container mx-auto px-4 max-w-7xl h-screen flex flex-col justify-center items-center">
          <div className="">
            <div className="m-10 flex flex-row justify-center items-center">
              <h2 className="text-4xl font-semibold"> Shop By Category </h2>
            </div>

            <div className="flex flex-row justify-center items-center gap-8">
              <ImageCard />

              <ImageCard />

              <ImageCard />
            </div>
          </div>
        </div>
        {/* about */}
        <div className="container mx-auto px-4 max-w-7xl">
          <TwoColumnSection />
        </div>

        {/* featured products */}

        <div className="container mx-auto px-4 py-10 max-w-7xl h-auto flex flex-col justify-center items-center">
          <div className="">
            <div className="m-10 flex flex-row justify-center items-center">
              <h2 className="text-4xl font-semibold"> Featured Items </h2>
            </div>

            <div className="flex flex-row flex-wrap justify-center items-center gap-8">
              <ProductCard />

              <ProductCard />

              <ProductCard />

              <ProductCard />

              <ProductCard />

              <ProductCard />
            </div>
          </div>
        </div>

        {/* adverticement */}

        <div className="container mx-auto px-4 max-w-7xl h-auto flex flex-col justify-center items-center">
          <Promotion />
        </div>

        {/* Products */}

        <div className="container mx-auto px-4 py-10 max-w-7xl h-auto flex flex-col justify-center items-center">
          <div className="">
            <div className="m-10 flex flex-row justify-center items-center">
              <h2 className="text-4xl font-semibold">
                {' '}
                Browse Our Top Selling Items{' '}
              </h2>
            </div>

            <div className="flex flex-row flex-wrap justify-center items-center gap-8">
              <ProductCard />

              <ProductCard />

              <ProductCard />

              <ProductCard />

              <ProductCard />

              <ProductCard />

              <ProductCard />

              <ProductCard />

              <ProductCard />
            </div>
          </div>
        </div>

        {/* Promotions */}

        <div className="container mx-auto px-4 py-10 max-w-7xl h-auto flex flex-col justify-center items-center">
          <Discounts />
        </div>

        {/* reviews */}

        <div className="container mx-auto px-4 py-10 max-w-7xl h-auto flex flex-col justify-center items-center">
          <Discounts />
        </div>
      </div>
    </>
  );
};

export default Home;
