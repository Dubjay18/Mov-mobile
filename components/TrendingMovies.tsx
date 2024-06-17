import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { MovieItem } from "@/config/api";
import MovieCard from "@/components/MovieCard";
import { router } from "expo-router";

var { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data }: { data: MovieItem[] }) {
  const handleClick = (movie: MovieItem) => {
    router.push({
      pathname: "/Movie",
      params: {
        movie_id: movie.id,
      },
    });
  };
  return (
    <View className={"mb-4"}>
      <Text className={"text-white text-xl mx-4 mb-5"}>Trending Movies</Text>
      <Carousel<MovieItem>
        data={data}
        renderItem={({ item }) => (
          <MovieCard movie={item} handleClick={() => handleClick(item)} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={600}
        itemWidth={width * 0.62}
        slideStyle={{
          display: "flex",
          alignItems: "center",
        }}
      />
    </View>
  );
}
