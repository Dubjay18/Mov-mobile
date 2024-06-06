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
        source={{
          uri: `https://image.tmdb.org/t/p/original${movie?.poster_path}`,
        }}
        className={"rounded-3xl"}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
      />
    </TouchableWithoutFeedback>
  );
}
