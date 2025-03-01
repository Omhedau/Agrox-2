import { Stack } from "expo-router";

const OnboardingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="select-language" options={{ headerShown: false }} />
      <Stack.Screen name="select-gender" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OnboardingLayout;