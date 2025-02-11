import images from "@/constants/images";
import { View, Text, Image } from "react-native";

const NoResult = () => {
  return (
    <View className="flex items-center my-5">
      <Image
        source={images.noResult}
        className="w-11/12 h-80"
        resizeMode="contain"
      />
      <Text className="text-2xl font-rubik-bold to-black-300 mt-5">
        No Result
      </Text>

      <Text className="text-base text-black-100 mt-2">
        We couldn't find any results
      </Text>
    </View>
  );
};

export default NoResult;
