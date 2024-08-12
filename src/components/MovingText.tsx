import {TextStyle, ViewStyle} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface MovingTextProps {
  text: string;
  animationThreshold: number;
  style?: TextStyle | ViewStyle | TextStyle[] | ViewStyle[];
}

const MovingText: React.FC<MovingTextProps> = ({
  text,
  animationThreshold,
  style,
}) => {
  // Shared value for horizontal translation (X-axis)
  const translateX = useSharedValue(0);

  // Determine if animation should be triggered based on text length
  const shouldAnimate = text.length > animationThreshold;

  // Calculate the width of the text based on its length (used for animation)
  const textWidth = text.length * 3;

  useEffect(() => {
    // If animation is not required, return early
    if (!shouldAnimate) {
      return;
    }

    // Start the animation with a delay, repeat it indefinitely, and alternate directions
    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, {
          duration: 5000,
          easing: Easing.linear,
        }),
        -1,
        true,
      ),
    );
  }, [shouldAnimate, textWidth, translateX]);

  // Define the animated style for the text
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <Animated.Text
      numberOfLines={1}
      style={[
        animatedStyle,
        style,
        // eslint-disable-next-line react-native/no-inline-styles
        shouldAnimate && {
          width: 9999,
          paddingLeft: 16,
        },
      ]}>
      {text}
    </Animated.Text>
  );
};

export default MovingText;
