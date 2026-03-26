import { createContext, useContext, useState, ReactNode } from "react";

interface AppState {
  isCheckedIn: boolean;
  checkInTime: string | null;
  checkIn: () => void;
  showAIInsight: boolean;
  dismissAIInsight: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  gpsTracking: boolean;
  toggleGPS: () => void;
}

const AppContext = createContext<AppState>({} as AppState);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [showAIInsight, setShowAIInsight] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [gpsTracking, setGpsTracking] = useState(true);

  const checkIn = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setIsCheckedIn(true);
    setCheckInTime(time);
  };

  const dismissAIInsight = () => setShowAIInsight(false);
  const toggleDarkMode = () => setDarkMode((v) => !v);
  const toggleGPS = () => setGpsTracking((v) => !v);

  return (
    <AppContext.Provider
      value={{
        isCheckedIn,
        checkInTime,
        checkIn,
        showAIInsight,
        dismissAIInsight,
        darkMode,
        toggleDarkMode,
        gpsTracking,
        toggleGPS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
