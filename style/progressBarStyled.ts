import styled from "styled-components/native";
import { colors } from "../constants/Colors";

export const ProgressBarView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 6;
  width: 60%;
  margin-top: 25px;
`;
export const BarView = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  background-color: #36363b;
  border: none;
  border-radius: 10px;
`;
export const Bar = styled.View`
  flex: 1;
  justify-content: center;
`;

export const BarViewText = styled.View`
  position: absolute;
  top: 12%;
  z-index: 1;
`;
export const BarText = styled.Text`
`;