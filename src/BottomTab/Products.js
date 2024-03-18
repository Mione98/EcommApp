import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";

const url =
  "https://api.asindataapi.com/request?api_key=3394CBE86FC346F08B5D3DDBCAE2BC2D&type=search&amazon_domain=amazon.com&search_term=vinyl+record";

export default function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getAPIData();
  }, []);

  const getAPIData = async () => {
    try {
      let results = await fetch(url);
      results = await results.json();
      setData(results.search_results);
      console.log(results.search_results);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    console.log(data);
    const filteredData = data.filter((product) => {
      console.log(product);
      return product?.title?.includes(formattedQuery);
    });

    setData(filteredData);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error in fetching data</Text>;
      </View>
    );
  }

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Search Products"
        clearButtonMode="always"
        style={styles.searchBar}
        autoCapitalize="none"
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.image}
            />
            <View>
              <Text style={styles.textTitle}>{item.title}</Text>
              <Text style={styles.textPrice}>
                {item.price.symbol}
                {item.price.value}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
    // {/* {data.length
    //   //   ? data.map((item, index) => (
    //   //       <View key={index}>
    //   //         <Text> {item.title}</Text>
    //   //         <Image
    //   //           style={styles.image}
    //   //           source={{
    //   //             uri: item.image,
    //   //           }}
    //   //         ></Image>
    //   //         <Text>{item.body}</Text>
    //   //       </View>
    //   //     ))
    //   //   : null} */}
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  searchBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  textTitle: {
    fontSize: 12,
    marginLeft: 10,
    fontWeight: "600",
  },
  textPrice: {
    fontSize: 10,
    marginLeft: 18,
  },
});
