import { useEffect, useState } from 'react';
import ImageSlider from '../../components/ImageSlider';
import ImageCard from '../../components/ImageCard';
import TwoColumnSection from '../../components/TwoColumnSection';
import ProductCard from '../../components/ProductCard';
import Promotion from '../../sections/adverticements/Promotion';
import Discounts from '../../sections/adverticements/Discounts';
import { useDispatch } from 'react-redux';

const categoryData = [
  {
    id: 1,
    image:
      'https://img.freepik.com/free-photo/handsome-man-white-shirt-posing-attractive-guy-with-fashion-hairstyle-confident-man-with-short-beard-adult-boy-with-brown-hair-closeup-portrait_186202-8545.jpg?w=740&t=st=1704815895~exp=1704816495~hmac=4b7e055291a23f24d79d8f11ff4b04e7a12c76d2eab17b43e65ca149cda6c233',
    name: 'Men',
    description:
      'Elevate your style with our curated collection of fashionable apparel',
  },
  {
    id: 2,
    image:
      'https://img.freepik.com/free-photo/portrait-beautiful-face-young-woman-with-long-brown-hair_186202-4331.jpg?w=740&t=st=1704816287~exp=1704816887~hmac=5ff1a59e998e1fdad4cd71f5246af6cac70fcdbeb47403c17993e13bd0e6b064',
    name: 'Women',
    description: 'Embrace your unique charm with our trendy and elegant',
  },
  {
    id: 3,
    image:
      'https://img.freepik.com/free-photo/young-siblings-standing-with-arms-crossed_23-2148414432.jpg?w=740&t=st=1704816390~exp=1704816990~hmac=226202fd3c0f339efabb4da44804a5158e05a1b9907db3c66c6a4e06cab31f99',
    name: 'Kids',
    description:
      'Spark joy in little hearts! Discover playful and comfortable clothing',
  },
];

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [festuredProducts, setFeaturedProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const response = await fetch(
          'http://localhost:3005/api/product/featured'
        );
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const getAllProducts = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/product');
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getFeaturedProducts();
    getAllProducts();
  }, []);

  console.log('allProducts  ', allProducts);

  return (
    <>
      <div className="mx-auto w-full">
        {/* carowsal */}
        <ImageSlider />
        {/* shop by category */}
        <div className="container mx-auto px-4 max-w-7xl py-16 flex flex-col justify-center items-center h-screen">
          <div className="">
            <div className="my-5 flex flex-row justify-center items-center">
              <h2 className="text-4xl font-semibold text-gray-800">
                {' '}
                Shop By Category{' '}
              </h2>
            </div>

            <div className="flex flex-row justify-center items-center gap-5 flex-wrap mt-16">
              {categoryData.map((item) => {
                return (
                  <ImageCard
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    key={item.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/* about */}
        <div className="w-ful mx-auto ">
          <TwoColumnSection
            image={
              'https://images.unsplash.com/photo-1524275539700-cf51138f679b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            imageLeft={true}
            heading={'Welcome to Lilac Store'}
            subHeading={'About us'}
            content={
              <>
                <p>
                  At Lilac Store, we're more than just a clothing store — we're
                  a destination for style enthusiasts seeking a blend of
                  trend-setting fashion and timeless classics. Our passion for
                  curating unique collections stems from a desire to empower
                  individuals to express their personality through what they
                  wear. As the founder, I envisioned a space where fashion meets
                  individuality, and every piece tells a story. From carefully
                  selected materials to attention to detail Lilac Store. Our
                  garments are designed to make you feel confident and stylish
                  every day.Thank you for joining us on this fashion journey,
                  and we can't wait for you to explore the world of Lilac Store!
                </p>
              </>
            }
            btnLink={'/about'}
          />
        </div>

        {/* featured products */}

        <div className="container mx-auto px-4 py-10 max-w-7xl h-auto flex flex-col justify-center items-center">
          <div className="">
            <div className="m-10 flex flex-row justify-center items-center">
              <h2 className="text-4xl font-semibold text-gray-800">
                {' '}
                Featured Items{' '}
              </h2>
            </div>

            <div className="flex flex-row flex-wrap justify-center items-center gap-8">
              {festuredProducts.map(
                ({
                  _id,
                  name,
                  image,
                  brand,
                  numReviews,
                  price,
                  review,
                  category,
                  description,
                  images,
                  isFeatured,
                  stock,
                }) => {
                  return (
                    <ProductCard
                      key={_id}
                      brand={brand}
                      image={image}
                      name={name}
                      review={review.map((item) => item.rating)}
                      numReviews={numReviews}
                      price={price}
                      data={{
                        _id,
                        name,
                        image,
                        brand,
                        numReviews,
                        price,
                        review,
                        category,
                        description,
                        images,
                        isFeatured,
                        stock,
                      }}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* adverticement */}

        <div className=" mx-auto w-full h-auto flex flex-col justify-center items-center">
          <Promotion />
        </div>

        {/* Products */}

        <div className="container mx-auto px-4 py-10 max-w-7xl h-auto flex flex-col justify-center items-center">
          <div className="">
            <div className="m-10 flex flex-row justify-center items-center">
              <h2 className="text-4xl font-semibold text-gray-800">
                {' '}
                Browse Our Top Selling Items{' '}
              </h2>
            </div>

            <div className="flex flex-row flex-wrap justify-center items-center gap-8">
              {allProducts.map(
                ({
                  _id,
                  name,
                  image,
                  brand,
                  numReviews,
                  price,
                  review,
                  category,
                  description,
                  images,
                  isFeatured,
                  stock,
                }) => {
                  return (
                    <ProductCard
                      key={_id}
                      brand={brand}
                      image={image}
                      name={name}
                      review={review.map((item) => item.rating)}
                      numReviews={numReviews}
                      price={price}
                      data={{
                        _id,
                        name,
                        image,
                        brand,
                        numReviews,
                        price,
                        review,
                        category,
                        description,
                        images,
                        isFeatured,
                        stock,
                      }}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Promotions */}

        <div className="container mx-auto px-4 py-10 max-w-7xl h-auto flex flex-col justify-center items-center">
          <Discounts />
        </div>

        {/* reviews */}

        {/* footer */}
      </div>
    </>
  );
};

export default Home;
