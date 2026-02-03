import React from 'react';
import { ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface AnimatedCardProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
  pressScale?: number;
  className?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  onPress,
  pressScale = 0.98,
  className = '',
  style,
  ...props
}) => {
  const scale = useSharedValue(1);
  const pressed = useSharedValue(false);

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
      scale.value = withSpring(pressScale, { damping: 15, stiffness: 400 });
    })
    .onFinalize(() => {
      pressed.value = false;
      scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    })
    .onEnd(() => {
      if (onPress) {
        onPress();
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        className={`bg-white rounded-3xl p-5 shadow-sm border border-gray-100 ${className}`}
        style={[animatedStyle, style]}
        {...props}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

interface FadeInViewProps extends ViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  duration = 500,
  className = '',
  style,
  ...props
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(1, { duration });
      translateY.value = withTiming(0, { duration });
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View className={className} style={[animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
};

interface ScaleOnPressProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export const ScaleOnPress: React.FC<ScaleOnPressProps> = ({
  children,
  onPress,
  className = '',
  style,
  ...props
}) => {
  const scale = useSharedValue(1);

  const tap = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
    })
    .onFinalize(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    })
    .onEnd(() => {
      if (onPress) {
        onPress();
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View className={className} style={[animatedStyle, style]} {...props}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};
