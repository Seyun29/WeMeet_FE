import Svg, { Path, G, Defs, ClipPath, Rect } from "react-native-svg";
import React from "react";

const Home = ({ color }) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_477_1443)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.8 2.65C11.1462 2.39036 11.5673 2.25 12 2.25C12.4327 2.25 12.8538 2.39036 13.2 2.65L20.2 7.9C20.4484 8.08629 20.65 8.32786 20.7889 8.60557C20.9277 8.88328 21 9.18951 21 9.5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.5C3 9.18951 3.07229 8.88328 3.21115 8.60557C3.35 8.32786 3.55161 8.08629 3.8 7.9L10.8 2.65Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_477_1443">
          <Rect width="24" height="24" fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default Home;
