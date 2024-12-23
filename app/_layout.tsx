import { View, Text, Button } from 'react-native'
import React, { useEffect, useCallback, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import * as Font from 'expo-font';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/toast";

export default function _layout() {
  const queryClient = new QueryClient();
  const [fontsLoaded] = useFonts({
    "NanumSquareNeo-Variable": require("../assets/fonts/NanumSquareNeo-Variable.ttf"),
    "SOYOMaple-Regular": require("../assets/fonts/SOYO-Maple-Regular.ttf"),
    "Quicksand-Variable": require("../assets/fonts/Quicksand-VariableFont_wght.ttf"),
  });
  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Stack
          screenOptions={
            {
              // headerStyle: {
              //     backgroundColor: 'black'
              // },
              // headerTintColor: 'white'
            }
          }
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Home",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen
            name="[missing]"
            options={{
              title: "404",
            }}
          /> */}
        </Stack>

        <Toast config={toastConfig} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}