import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { themeStyles } from "@/constants/Colors";
import { MovieItem } from "@/config/api";
import { useRouter } from "expo-router";

var { width, height } = Dimensions.get("window");

export default function MovieList({
  data,
  title,
  hideSeeAll,
}: {
  data: MovieItem[];
  title: string;
  hideSeeAll?: boolean;
}) {
  const router = useRouter();
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <View className={"mb-4 space-y-8"}>
      <View className={"mx-4 flex-row justify-between items-center"}>
        <Text className={"text-white text-xl"}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={themeStyles.text} className={"text-lg"}>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
      >
        {data &&
          data?.map((movie, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() =>
                router.push({
                  pathname: "/Movie",
                  params: {
                    movie_id: movie.id,
                  },
                })
              }
            >
              <View className={"space-y-1 mr-4"}>
                <Image
                  source={{ uri: `${imageBaseUrl}${movie?.poster_path}` }}
                  className={"rounded-3xl"}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                />
                <Text className={"text-neutral-300 text-lg"}>
                  {movie.title.length > 14
                    ? movie.title.slice(0, 14) + "..."
                    : movie.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
      </ScrollView>
    </View>
  );
}
