/* eslint-disable array-callback-return */
import {
  faCloudArrowUp,
  faStar,
  faTimes,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
  addGallaryImages,
  deleteGallaryImage,
  getProduct,
} from "../../../redux/actions/productsActions";
import isEmpty from "../../../utilis/isEmpty";
import { confirmToDelete } from "../../../utilis/confirmToDelete";

const Show = () => {
  const [imageFiles, setimageFiles] = useState([]);
  const [images, setimages] = useState([]);

  const { productId } = useParams();
  const getProductForUi = bindActionCreators(getProduct, useDispatch());
  const addGallaryImagesHND = bindActionCreators(
    addGallaryImages,
    useDispatch()
  );
  const deleteGallaryImagesHND = bindActionCreators(
    deleteGallaryImage,
    useDispatch()
  );

  const { product } = useSelector((state) => state.productsReducer);

  const submitGallary = async (e) => {
    e.preventDefault();
    const gallary = new FormData();
    imageFiles.map((file) => gallary.append("images", file));
    if (await addGallaryImagesHND(gallary, productId)) {
      setimageFiles([]);
    }
  };
  useEffect(() => {
    getProductForUi(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <div className="flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4">
      <div className="flex text-base text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-4xl">
        <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
          <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
            <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
              <img
                src={product.productImage}
                alt=""
                className="object-center object-cover"
              />
            </div>
            <div className="sm:col-span-8 lg:col-span-7">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:pe-12">
                {product.name}
              </h2>

              <section aria-labelledby="information-heading" className="mt-2">
                <h3 id="information-heading" className="sr-only">
                  Product information
                </h3>

                <p className="text-2xl text-gray-900">${product.price}</p>
                <p>
                  <strong>Publisher:- </strong>

                  <span>
                    {" "}
                    {product.user?.username || (
                      <del>{product.deleted?.username}</del>
                    )}
                  </span>
                </p>
                <div className="mt-6">
                  <h4 className="sr-only">Reviews</h4>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-300"
                      />
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-300"
                      />
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-300"
                      />
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-300"
                      />
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-300"
                      />
                    </div>
                    <p className="sr-only">3.9 out of 5 stars</p>
                    <Link
                      to="#"
                      className="ms-3 text-sm font-medium text-sky-600 hover:text-sky-500"
                    >
                      117 reviews
                    </Link>
                  </div>
                </div>
              </section>

              <section
                aria-labelledby="options-heading"
                className="mt-10 text-center"
              >
                <h4 className="text-2xl font-semibold  py-8"> Gallary</h4>
                <div className="flex justify-center ">
                  {product.productGallary &&
                    product.productGallary.map((img) => (
                      <div key={img.img} className="relative">
                        <img alt={img.img} className="w-10" src={img.img} />
                        <button
                          onClick={
                            () =>
                              confirmToDelete(
                                "image",
                                deleteGallaryImagesHND,
                                `${productId}/${img._id}/${img.cloudinary_id}`
                              )
                            // DeleteImage(product._id, img.img, img.cloudinary_id)
                          }
                          className="absolute -top-6 text-gray-50 bg-red-500 rounded-full w-6 h-6"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ))}
                </div>

                <div className="pb-5 font-medium text-red-500">
                  There is no gallary items
                </div>
                <div className="flex justify-center items-center w-full relative">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    {isEmpty(imageFiles) ? (
                      <div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <FontAwesomeIcon
                          icon={faCloudArrowUp}
                          size="xl"
                          className="text-gray-600 pb-5"
                        />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          JPEG, PNG, JPG (MAX. 2mb)
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap justify-start ">
                        <button
                          onClick={submitGallary}
                          className="absolute top-2 bg-sky-600 text-gray-200 p-2  w-20 rounded-md text-xl"
                        >
                          <FontAwesomeIcon icon={faUpload} />
                        </button>
                        {imageFiles.map((file, i) => {
                          var reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onload = (e) => {
                            images[i] = e.target.result;
                            setimages([...images]);
                          };
                        })}

                        {images.map((image, i) => (
                          <img
                            key={i}
                            src={image}
                            alt=""
                            className="w-24 px-2"
                          />
                        ))}
                      </div>
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      multiple
                      draggable={true}
                      onChange={(e) =>
                        setimageFiles(Array.from(e.target.files))
                      }
                    />
                  </label>
                </div>
                {/* <button className="bg-sky-700 text-gray-100 py-2 px-4 rounded-md font-medium">
                  <FontAwesomeIcon icon={faCartArrowDown} /> Add to cart
                </button> */}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
