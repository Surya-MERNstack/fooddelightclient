// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import AllProduct from "../component/AllProduct";
// import { addCartItems } from "../redux/ProductSlice";

// const Menu = () => {
//   const { dataFilter } = useParams();
//   const productData = useSelector((state) => state.product.productList);
//   const ProductDisplay = productData.filter((e) => e._id == dataFilter)[0];
//   const navigate = useNavigate();
  
//   const dispatch = useDispatch();

//   const handleAddCart = () => {
//     dispatch(addCartItems(ProductDisplay));
//   };



//   return (
//     <div className=" p-2 md:p-4">
//       <div className="w-full max-w-2xl  bg-white m-auto md:flex">
//         <div className="max-w-xl bg-white  overflow-hidden md:text-center">
//           <img
//             src={ProductDisplay.image}
//             className="scale-50 hover:scale-90  h-30 transition-all "
//           ></img>
//         </div>
//         <div className="flex flex-col gap-3 bg-white">
//           <h3 className="font-semibold text-slate-600  capitalize text-md md:text-4xl">
//             {ProductDisplay.name}
//           </h3>
//           <p className="text-center text-slate-400 font-medium text-2xl">
//             {ProductDisplay.category}
//           </p>
//           <p className="text-center font-bold md:text-2ml">
//             <span className="text-red-500">₹</span>
//             <span>{ProductDisplay.price}</span>
//           </p>
//           <div className="flex">
//             <button
//               onClick={handleAddCart}
//               className="bg-yellow-500 p-1 m-2 rounded w-full text-white  hover:bg-yellow-600 px-5  min-w-[130px] "
//             >
//               Add Cart
//             </button>
//           </div>
//           <div>
//             <p className="text-red-500 font-medium">Description : </p>
//             <p>{ProductDisplay.description}</p>
//           </div>
//         </div>
//       </div>
//       <AllProduct heading={"Related Product"} />
//     </div>
//   );
// };

// export default Menu;





import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItems } from "../redux/ProductSlice";

const Menu = () => {
  const { dataFilter } = useParams();
  const productData = useSelector((state) => state.product.productList);
  const ProductDisplay = productData.filter((e) => e._id == dataFilter)[0];
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(addCartItems(ProductDisplay));
  };

  // State to track image loading and error
  const [imageLoadError, setImageLoadError] = useState(false);

  // Function to handle image load error
  const handleImageError = () => {
    setImageLoadError(true);
    // Navigate to the 404 page with a refresh message
    navigate("/404", { state: { message: "Image not found. Please refresh the page." } });
  };

  return (
    <div className=" p-2 md:p-4">
      <div className="w-full max-w-2xl  bg-white m-auto md:flex">
        {imageLoadError ? ( // Check if there was an image load error
          navigate("/404", { state: { message: "Image not found. Please refresh the page." } })
        ) : (
          <>
            {ProductDisplay ? ( // Check if ProductDisplay is defined
              <div className="max-w-xl bg-white  overflow-hidden md:text-center">
                <img
                  src={ProductDisplay.image}
                  className="scale-50 hover:scale-90  h-30 transition-all"
                  onError={handleImageError} // Set up error handling for the image
                  alt={ProductDisplay.name} // Add alt text for accessibility
                />
              </div>
            ) : (
              // ProductDisplay is undefined
              navigate("/404", { state: { message: "Product not found. Please refresh the page." } })
            )}
            <div className="flex flex-col gap-3 bg-white">
              {ProductDisplay ? ( // Check if ProductDisplay is defined
                <>
                  <h3 className="font-semibold text-slate-600  capitalize text-md md:text-4xl">
                    {ProductDisplay.name}
                  </h3>
                  <p className="text-center text-slate-400 font-medium text-2xl">
                    {ProductDisplay.category}
                  </p>
                  <p className="text-center font-bold md:text-2ml">
                    <span className="text-red-500">₹</span>
                    <span>{ProductDisplay.price}</span>
                  </p>
                  <div className="flex">
                    <button
                      onClick={handleAddCart}
                      className="bg-yellow-500 p-1 m-2 rounded w-full text-white  hover:bg-yellow-600 px-5  min-w-[130px] "
                    >
                      Add Cart
                    </button>
                  </div>
                  <div>
                    <p className="text-red-500 font-medium">Description : </p>
                    <p>{ProductDisplay.description}</p>
                  </div>
                </>
              ) : null}
            </div>
          </>
        )}
      </div>
      <AllProduct heading={"Related Product"} />
    </div>
  );
};

export default Menu;
