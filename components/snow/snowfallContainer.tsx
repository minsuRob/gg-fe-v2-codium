import React from "react";
import { View } from "react-native";
import { SnowfallStyle } from "./snowfallStyle";

interface SnowfallContainerProps {
  children: React.ReactNode;
}

const SnowfallContainer: React.FC<SnowfallContainerProps> = ({ children }) => {
  return <View style={SnowfallStyle.container}>{children}</View>;
};

export default SnowfallContainer;
