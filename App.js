import React, {useRef, useMemo, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, LogBox } from 'react-native';
import ListItem from './components/ListItem';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { SAMPLE_DATA } from './assets/data/sampleData';
import { ScrollView, FlatList, GestureHandlerRootView, gestureHandlerRootHOC  } from 'react-native-gesture-handler';
import Chart from './components/Chart';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTitle}>Markets</Text>
    </View>
    <View style={styles.divider}/>
  </>
)

export default function App() {

  const [selectedCoidData, setSelectedCoinData] = useState(null);

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current.present();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, }}>
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={SAMPLE_DATA}
          renderItem={({item}) => (
            <ListItem 
              name={item.name} 
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
              logoUrl={item.image}
              onPress={() => openModal(item)}
            />
          )}
          ListHeaderComponent={<ListHeader/>}
        />
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        { selectedCoidData ? (
        <Chart 
          currentPrice={selectedCoidData.current_price}
          logoUrl={selectedCoidData.image}
          name={selectedCoidData.name}
          symbol={selectedCoidData.symbol}
          priceChangePercentage7d={selectedCoidData.price_change_percentage_7d_in_currency}
          sparkline={selectedCoidData.sparkline_in_7d.price}
        />
        )
        : null}
      </BottomSheetModal>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 10,
    backgroundColor: 'red',
  },
});
