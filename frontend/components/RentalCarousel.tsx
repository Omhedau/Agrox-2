import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import constants from '@/constants/images'; // Import your image constants

const { width } = Dimensions.get('window');

const slides = [
  { id: '1', text: '🚜 Rent farm equipment easily from nearby farmers!', image: constants.Cultivator },
  { id: '2', text: '📢 List your machines and earn extra income.', image: constants.Mulcher },
  { id: '3', text: '📍 Find machines available in your village.', image: constants.Tractor },
  { id: '4', text: '💬 Contact machine owners directly & negotiate.', image: constants.Transplanter },
];

const RentalCarousel = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll function
  const startAutoScroll = () => {
    autoScrollInterval.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setActiveIndex(nextIndex);
    }, 3000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollInterval.current !== null) {
        clearInterval(autoScrollInterval.current); // Cleanup on unmount
      }
    };
  }, [activeIndex]);

  // Handle manual scrolling
  const handleScrollEnd = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / width);
    setActiveIndex(index);

    // Restart auto-scroll after manual swipe
    if (autoScrollInterval.current !== null) {
      clearInterval(autoScrollInterval.current as NodeJS.Timeout);
    }
    startAutoScroll();
  };

  // Handle dot press
  const handleDotPress = (index) => {
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
    setActiveIndex(index);

    // Restart auto-scroll on dot press
    clearInterval(autoScrollInterval.current as NodeJS.Timeout);
    startAutoScroll();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={width}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd} // Ensures proper centering
      >
        {slides.map((item) => (
          <View key={item.id} style={styles.slideContainer}>
            <ImageBackground source={item.image} style={styles.slide} imageStyle={{ borderRadius: 15 }}>
              <View style={styles.overlay} />
              <Text style={styles.text}>{item.text}</Text>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleDotPress(index)}>
            <View style={[styles.dot, activeIndex === index && styles.activeDot]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RentalCarousel;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  slideContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: width * 0.9, // Increased to avoid gaps
    height: 200, // Better height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better text readability
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
    width: 15,
    height: 10,
    borderRadius: 5,
  },
});
