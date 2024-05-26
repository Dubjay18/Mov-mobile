import { Dimensions, Image, TouchableWithoutFeedback } from "react-native";
import { MovieItem } from "@/config/api";

var { width, height } = Dimensions.get("window");

export default function MovieCard({
  movie,
  handleClick,
}: {
  movie: MovieItem;
  handleClick: () => void;
}) {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={require("../assets/images/sukuna.jpg")}
        className={"rounded-3xl"}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
      />
    </TouchableWithoutFeedback>
  );
}
