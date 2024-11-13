import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.juego.de.memoria.app',
  appName: 'juegodememoria',
  webDir: 'www',
  server : {
    androidScheme: 'https'
  },
  plugins : {
    SplashScreen : {
      launchAutoHide : false
    }
  }
};

export default config;
