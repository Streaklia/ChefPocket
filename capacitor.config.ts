import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chefpocket.app',
  appName: 'ChefPocket',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;