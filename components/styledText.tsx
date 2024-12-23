import { typography } from "../constants/Typo";
import { Text, TextProps } from "./themed";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, typography.basic]} />;
}
