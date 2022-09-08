import React, { Component } from "react";
import { getTrackBackground, Range } from "react-range";

export default class PriceRange extends Component {
  render() {
    let { price, setPrice } = this.props;
    const MIN = 0;
    const MAX = 1000;
    const COLORS = ["#0C2960", "#276EF1", "#276EF1", "#0C2960"];
    return (
      <Range
        // allowOverlap={false}
        step={1}
        min={MIN}
        max={MAX}
        values={price}
        onChange={(price) => {
          setPrice(price);
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              background: getTrackBackground({
                values: price,
                colors: COLORS,
                min: MIN,
                max: MAX,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            value={price}
            index={1}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              backgroundColor: "#0075ff",
              borderRadius: "50%",
            }}
          />
        )}
      />
    );
  }
}
