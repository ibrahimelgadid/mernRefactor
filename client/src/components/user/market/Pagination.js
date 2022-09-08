// import isEmpty from "../../../utilis/isEmpty";

const Pagination = ({
  pageParam,
  searchParam,
  setSearchParams,
  loading,
  products,
}) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center space-x-1 py-5">
        {loading ? (
          <li>
            <a
              href="/"
              className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
        ) : (
          Array(products.count)
            .fill("")
            .map((product, index) => (
              <li key={index}>
                <span
                  onClick={() =>
                    searchParam
                      ? setSearchParams({
                          page: index + 1,
                          search: searchParam,
                        })
                      : setSearchParams({
                          page: index + 1,
                        })
                  }
                  className={`${
                    String(index + 1) === pageParam
                      ? "bg-indigo-700 text-gray-50"
                      : "text-gray-500 bg-white"
                  } cursor-pointer py-2 px-3 leading-tight  border border-gray-300 hover:bg-indigo-700 hover:text-gray-50`}
                >
                  {index + 1}
                </span>
              </li>
            ))
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
