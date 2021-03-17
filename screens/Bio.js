import React, { useEffect, setState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Bio = ({ therapist }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const loadTherapistData = async () => {
      const { data } = await therapist;
      setData(data);
    };
    if (!data) {
      loadTherapistData();
    }
  }, []);

  if (!data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity>
      <Image source={require(`${data.picture}`)} />
      <View>
        <Text>{data.name}</Text>
        <Text>{data.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Bio;
