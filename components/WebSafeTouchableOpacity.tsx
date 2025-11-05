import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Platform } from 'react-native';

export default function WebSafeTouchableOpacity(props: TouchableOpacityProps) {
  if (Platform.OS === 'web') {
    // Filter out React Native-specific props on web
    const {
      onResponderTerminate,
      onResponderTerminationRequest,
      ...webSafeProps
    } = props;
    return <TouchableOpacity {...webSafeProps} />;
  }
  
  return <TouchableOpacity {...props} />;
}