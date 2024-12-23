import styled from "styled-components/native";
const Font_18 = styled.Text`
  font-size: 18px;
`;
const Font_16 = styled.Text`
  font-size: 16px;
`;
export const MailBoxView = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 20px;
`;
export const MailTitleView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 5px;
`;
export const MailTitleText = styled(Font_18)`
  color: white;
  font-family: "SOYOMaple-Regular";
`;

export const MailNumberText = styled(Font_18)`
  color: #34ab96;
  font-family: "Quicksand-Variable";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  margin-top: 2px;
`;
export const MailChoseContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #6e6e73;
  border-bottom-width: 1px;
  padding-left: 20px;
`;
export const MailChoseView = styled.View<{ b_color: string }>`
  display: flex;
  flex-direction: row;
  gap: 3px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.b_color};
`;
export const MailInfoView = styled.View`
  display: flex;
  flex-direction: row;
`;
export const MailChoseText = styled(Font_16) <{ f_color: string }>`
  color: ${(props) => props.f_color};
  padding: 10px;
  font-family: "NanumSquareNeo-Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`;

export const DateText = styled(Font_16) <{ f_color: string }>`
  font-family: "Quicksand";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  color: ${(props) => props.f_color};
  margin-right: 20px;
  font-family: "SOYOMaple-Regular";
`;
