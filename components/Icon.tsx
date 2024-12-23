import React from "react";
import { Image, Platform, TouchableOpacity } from "react-native";
import { WithLocalSvg } from "react-native-svg";

type Props = {
  onPress?: any;
  url: string | any;
  width?: 24 | 30;
  height?: 24 | 30;
  style?: any;
};

export function Icon(props: Props) {
  return (
    <>
      {Platform.OS === "ios" || Platform.OS === "android" ? (
        <TouchableOpacity onPress={props.onPress}>
          <WithLocalSvg
            asset={props.url}
            width={props.width}
            height={props.height}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={props.onPress}>
          <Image style={props.style} source={props.url} />
        </TouchableOpacity>
      )}
    </>
  );
}
