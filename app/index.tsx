import { Redirect } from 'expo-router';
import { useUserStore } from '../stores/userStore';

export default function Index() {
  const { isOnboardingComplete } = useUserStore();

  if (!isOnboardingComplete) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
