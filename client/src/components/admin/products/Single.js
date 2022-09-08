import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/actions/productsActions";
import { confirmToDelete } from "../../../utilis/confirmToDelete";

import { Link } from "react-router-dom";

const Single = ({ product, index }) => {
  const deleteProductForUi = bindActionCreators(deleteProduct, useDispatch());

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {index}
        </th>
        <td className="py-4 px-6 font-bold hover:underline hover:text-gray-600 cursor-pointer ">
          <Link to={`/admin/products/${product._id}`}>{product.name}</Link>
        </td>
        <td className="py-4 px-6">
          {product.price}
          <span className="font-medium text-lg">$</span>{" "}
        </td>
        <td className="py-4 px-6 w-6">
          <img src={product.productImage} alt="" />
        </td>
        <td className="py-4 px-6 font-semibold">
          {product.user?.username || <del>{product.deleted.username}</del>}
        </td>
        <td className="py-4 px-6">
          <button
            onClick={() =>
              confirmToDelete("Product", deleteProductForUi, product._id)
            }
            className="text-red-600 font-medium "
          >
            Delete
          </button>
          <Link
            to={`/admin/products/edit/${product._id}`}
            className="text-blue-600 font-medium float-right"
          >
            Edit
          </Link>
        </td>
      </tr>
    </>
  );
};

export default Single;
