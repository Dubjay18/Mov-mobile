import {Text, View} from "react-native";
import Carousel from "react-native-snap-carousel";
import {MovieItem} from "@/config/api";
import MovieCard from "@/components/MovieCard";

export default function TrendingMovies({
                                           data,
                                       }: {
    data: MovieItem[]
}) {
    return (
        <View className={"mb-8"}>
            <Text className={"text-white text-xl mx-4 mb-5"}>Trending Movies</Text>
            <Carousel<MovieItem> data={data} renderItem={({item}) => (

                <MovieCard movie={item}/>
            )
            }
                                 firstItem={1}
                                 inactiveSlideOpacity={0.60}
                                 sliderWidth={600}
                                 itemWidth={400}
                // slideStyle={{
                //     display: "flex",
                //     alignItems: "center",
                // } as any}
            />

        </View>
    );
}