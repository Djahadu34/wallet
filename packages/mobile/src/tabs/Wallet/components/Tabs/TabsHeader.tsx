import { useTheme } from '$hooks';
import * as React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useTabCtx } from './TabsContainer';

interface TabsHeaderProps {
  
}

export const TabsHeader: React.FC<TabsHeaderProps> = (props) => {
  const dimensions = useWindowDimensions();
  const theme = useTheme();
  const { headerHeight, scrollY } = useTabCtx();

  
  const balanceStyle = useAnimatedStyle(() => {
    return {
      // paddingTop: NavBarHeight + statusBarHeight,
      transform: [{ 
        translateY: -(scrollY.value)
      }]
    }
  });

  
  return (
    <Animated.View
      style={[balanceStyle, {
        position: 'absolute',
        top: 0,
        zIndex: 4,
        width: dimensions.width,
        backgroundColor: theme.colors.backgroundPrimary
      }]}
      onLayout={(ev) => {
        console.log('header height', ev.nativeEvent.layout.height);
        headerHeight.value = ev.nativeEvent.layout.height;
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  }
});