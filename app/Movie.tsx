import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { themeStyles } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MovieItem } from "@/config/api";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";
export default function MovieScreen() {
  const params = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  // useEffect(() => {}, [params]);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      className={"flex-1 bg-neutral-900"}
    >
      <View className={"w-full"}>
        <SafeAreaView
          className={`${topMargin} absolute z-20 w-full flex-row justify-between items-center px-4 h-fit`}
        >
          <TouchableOpacity
            style={themeStyles.background}
            className={"rounded-xl p-1 "}
            onPress={() => router.back()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            className={"rounded-xl p-1 "}
          >
            <HeartIcon
              size={35}
              strokeWidth={2.5}
              color={
                isFavorite ? themeStyles.background.backgroundColor : "white"
              }
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <View>
        <Image
          source={require("../assets/images/sukuna.jpg")}
          style={{
            width,
            height: height * 0.55,
          }}
        />
        <LinearGradient
          colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
          style={{
            width,
            height: height * 0.48,
          }}
          start={{
            x: 0.5,
            y: 0,
          }}
          end={{
            x: 0.5,
            y: 1,
          }}
          className={"absolute bottom-0"}
        />
      </View>
      <View
        style={{
          marginTop: -(height * 0.09),
        }}
        className={"space-y-3"}
      >
        <Text
          className={
            "text-white text-3xl text-center tracking-wider font-bold "
          }
        >
          {(params as unknown as MovieItem)?.title}
        </Text>
        <Text
          className={"text-neutral-400 text-base text-center font-semibold"}
        >
          Released . 2024 . 170min
        </Text>
        <View className={"flex-row mx-4 space-x-2 justify-center"}>
          <Text
            className={"text-neutral-400 text-base text-center font-semibold"}
          >
            Action .
          </Text>
          <Text
            className={"text-neutral-400 text-base text-center font-semibold"}
          >
            Thrill .
          </Text>
          <Text
            className={"text-neutral-400 text-base text-center font-semibold"}
          >
            Comedy
          </Text>
        </View>
        <Text className={"text-neutral-400 mx-4 tracking-wide"}>
          {(params as unknown as MovieItem).overview}
        </Text>
      </View>
    </ScrollView>
  );
}
