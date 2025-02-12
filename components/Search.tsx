import icons from "@/constants/icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Text,
  ScrollView,
} from "react-native";

import { useDebouncedCallback } from "use-debounce";

import { RangeSlider } from "@react-native-assets/slider";
import images from "@/constants/images";
import { categories } from "@/constants/data";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const [search, setSearch] = useState(params.query);
  const [visible, setVisible] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [buildingSizeRange, setBuildingSizeRange] = useState([0, 1000]);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      router.setParams({ filter: "All" });
      return;
    }
    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const resetFilters = () => {
    setPriceRange([0, 100]);
    setBuildingSizeRange([0, 1000]);
    setSelectedCategory("All");
    router.setParams({ filter: "All" });
    setBedrooms(1);
    setBathrooms(1);
    setVisible(false);
  };

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-3">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything..."
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
        />
      </View>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View className="flex items-center justify-end bg-black/60 h-full">
          <View className="m-5 bg-white rounded-3xl p-5 shadow-black-200 h-[80%] w-full">
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerClassName="px-5 py-3"
            >
              <View className="flex flex-row justify-between items-center">
                <TouchableOpacity
                  onPress={() => setVisible(!visible)}
                  className="bg-primary-100 p-3 rounded-full"
                >
                  <Image source={icons.backArrow} className="size-5" />
                </TouchableOpacity>

                <Text className="font-rubik-semibold text-black-300 text-xl">
                  Filter
                </Text>

                <TouchableOpacity onPress={resetFilters}>
                  <Text className="text-primary-300 font-rubik-semibold text-lg">
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>

              <Text className="font-rubik-extrabold text-black-300 text-xl mt-10 mb-4">
                Price Range
              </Text>
              <Image
                source={images.barChart}
                className="w-full h-10 -mb-2"
                resizeMode="stretch"
              />
              <RangeSlider
                minimumValue={0}
                maximumValue={1000}
                step={10}
                minimumRange={priceRange[0]}
                onValueChange={(value) => setPriceRange(value)}
                outboundColor="#0061FF0a"
                inboundColor="#0061FF"
                thumbTintColor="white"
                thumbStyle={{
                  borderWidth: 3,
                  borderColor: "#0061FF",
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                }}
              />
              <View className="flex items-center justify-between flex-row">
                <Text className="text-primary-300 font-rubik-semibold">
                  $ {priceRange[0]}
                </Text>
                <Text className="text-primary-300 font-rubik-semibold">
                  $ {priceRange[1]}
                </Text>
              </View>

              <Text className="font-rubik-extrabold text-black-300 text-xl mt-10 mb-4">
                Property Type
              </Text>
              <View className="flex gap-x-2.5 gap-y-3 flex-row flex-wrap items-center">
                {categories?.slice(1)?.map((item, index) => (
                  <TouchableOpacity
                    key={`${item?.title}-${index}`}
                    onPress={() => handleCategoryPress(item?.category)}
                    className={`flex flex-col items-start px-10 py-2 rounded-full ${
                      selectedCategory === item?.category
                        ? "bg-primary-300"
                        : "bg-primary-100 border border-primary-200"
                    }`}
                  >
                    <Text
                      className={`text-xs ${
                        selectedCategory === item?.category
                          ? "text-white font-rubik-bold mt-0.5"
                          : "text-black-300 font-rubik"
                      }`}
                    >
                      {item?.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text className="font-rubik-extrabold text-black-300 text-xl mt-10 mb-1">
                Home Details
              </Text>
              <View className="flex flex-row items-center justify-between mb-3">
                <Text className="text-black-200 font-rubik-medium text-lg">
                  Bedrooms
                </Text>
                <View className="flex flex-row gap-2 items-center">
                  <TouchableOpacity
                    className="size-8 flex items-center justify-center border border-primary-200 rounded-full bg-primary-100"
                    onPress={() => setBedrooms((prev) => Math.max(prev - 1, 1))}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text>{bedrooms}</Text>
                  <TouchableOpacity
                    className="size-8 flex items-center justify-center border border-primary-200 rounded-full bg-primary-100"
                    onPress={() => setBedrooms((prev) => prev + 1)}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="w-full h-0.5 bg-primary-100 mb-3" />
              <View className="flex flex-row items-center justify-between mb-3">
                <Text className="text-black-200 font-rubik-medium text-lg">
                  Bathrooms
                </Text>
                <View className="flex flex-row gap-2 items-center">
                  <TouchableOpacity
                    className="size-8 flex items-center justify-center border border-primary-200 rounded-full bg-primary-100"
                    onPress={() =>
                      setBathrooms((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text>{bathrooms}</Text>
                  <TouchableOpacity
                    className="size-8 flex items-center justify-center border border-primary-200 rounded-full bg-primary-100"
                    onPress={() => setBathrooms((prev) => prev + 1)}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text className="font-rubik-extrabold text-black-300 text-xl mt-10 mb-4">
                Building Size
              </Text>

              <RangeSlider
                minimumValue={0}
                maximumValue={1000}
                step={10}
                minimumRange={buildingSizeRange[0]}
                onValueChange={(value) => setBuildingSizeRange(value)}
                outboundColor="#0061FF0a"
                inboundColor="#0061FF"
                thumbTintColor="white"
                thumbStyle={{
                  borderWidth: 3,
                  borderColor: "#0061FF",
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                }}
              />
              <View className="flex items-center justify-between flex-row">
                <Text className="text-primary-300 font-rubik-semibold">
                  {buildingSizeRange[0]}
                </Text>
                <Text className="text-primary-300 font-rubik-semibold">
                  {buildingSizeRange[1]}
                </Text>
              </View>

              <TouchableOpacity className="mt-3 py-5 w-full rounded-full bg-primary-300">
                <Text className="text-white mx-auto text-lg font-rubik-bold">
                  Set Filter
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Search;
