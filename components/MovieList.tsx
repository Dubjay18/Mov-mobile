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

var { width, height } = Dimensions.get("window");

export default function MovieList({
  data,
  title,
}: {
  data: MovieItem[];
  title: string;
}) {
  return (
    <View className={"mb-4 space-y-8"}>
      <View className={"mx-4 flex-row justify-between items-center"}></View>
      <Text className={"text-white text-xl"}>{title}</Text>
      <TouchableOpacity>
        <Text style={themeStyles.text} className={"text-lg"}>
          See All
        </Text>
      </TouchableOpacity>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
      >
        {data.map((movie, index) => (
          <TouchableWithoutFeedback key={index}>
            <View className={"space-y-1 mr-4"}>
              <Image
                source={require("../assets/images/sukuna.jpg")}
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
