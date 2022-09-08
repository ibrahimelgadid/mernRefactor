import React from "react";
import Fancybox from "./fancybox/Fancybox";

const Gallary = () => {
  return (
    <div>
      <Fancybox>
        {product.productGallary.length > 0 && (
          <p>
            <strong>
              <i className="fas fa-img"></i> Gallary:-{" "}
            </strong>
            {product.productGallary.map((img) => (
              <span data-fancybox="gallery" data-src={img.img}>
                <img
                  alt=""
                  className="img-fluid rounded-circle img-thumbnail mx-auto"
                  style={{
                    width: "50px",
                    height: "50px",
                    cursor: "pointer",
                  }}
                  src={img.img}
                />
              </span>
            ))}
          </p>
        )}
      </Fancybox>
    </div>
  );
};

export default Gallary;
