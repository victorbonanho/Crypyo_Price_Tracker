import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import NumberFormat from 'react-number-format'

const ListItem = ({ name, symbol, currentPrice, priceChangePercentage7d, logoUrl, onPress }) => {

  const priceChangeColor = priceChangePercentage7d > 0  ? '#34C759' : '#FF3B30';
    
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        
        {/* Left side */}
        <View style={styles.leftWrapper}>
            <Image source={{ uri: logoUrl }} style={styles.image}/>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{ name }</Text>
                <Text style={styles.subtitle}>{ symbol.toUpperCase() }</Text>
            </View>
        </View>

        {/* Right side */}
        <View style={styles.rightWrapper}>
            <NumberFormat
                value={currentPrice}
                displayType="text"
                thousandSeparator
                prefix="$"
                renderText={(value) => <Text style={styles.title}>{value}</Text>}
            />
            <Text style={[styles.subtitle, {color: priceChangeColor}]}>{ priceChangePercentage7d.toFixed(2) }%</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    itemWrapper: {
        paddingHorizontal: 16,
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 48,
        width: 48,
    },
    titleWrapper: {
        marginLeft: 8,
    },
    title: {
        fontSize: 18,
    },
    subtitle: {
        fontSize: 14, 
        color: "#A9ABB1",
        marginTop: 4,
    }, 
    rightWrapper: {
        alignItems: "flex-end"
    },   
})

export default ListItem