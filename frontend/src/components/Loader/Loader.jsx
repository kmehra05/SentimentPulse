import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <RotatingLines
      strokeColor="white"
      strokeWidth="5"
      animationDuration="0.75"
      width="35"
      visible={true}
    />
  )
}

export default Loader;