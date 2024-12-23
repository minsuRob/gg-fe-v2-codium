import styled from "styled-components/native";

export const BottemSheetView = styled.View`
    flex:1;
    justify-content: flex-end;
    margin: 0;
    border-radius:200px;
`
export const BottemSheetContentView = styled.View`
    background-color: #3D3D41;
    align-items: start;
    max-height: 215px;
    border-top-left-radius:28px;
    border-top-right-radius: 28px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
`
export const BottemSheetDraeView = styled.View`
    height: 39px;
    align-items: center;
    justify-content: center;
    width: 100%;
`
export const BottemSheetElementView = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: 16px;
    width: 100%;
`
export const BottemSheetBorderView = styled.View`
    border-bottom-width: 1;
    border-bottom-color: #6E6E73;
    padding-bottom: 10px;
    margin-bottom: 10px;
    width: 100%;
    gap: 8px;
`