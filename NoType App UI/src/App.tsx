import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { UserTypeSelection } from "./components/UserTypeSelection";
import { MainChatScreen } from "./components/MainChatScreen";

type Screen = "login" | "userTypeSelection" | "chat";
type Theme = "dark" | "light";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [userType, setUserType] = useState<string>("");
  const [theme, setTheme] = useState<Theme>("dark");

  const handleLogin = (method: 'google' | 'guest') => {
    setCurrentScreen("userTypeSelection");
  };

  const handleSelectUserType = (type: string) => {
    setUserType(type);
    setCurrentScreen("chat");
  };

  const handleChangeUserType = () => {
    setCurrentScreen("userTypeSelection");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen">
      {currentScreen === "login" && <LoginScreen onLogin={handleLogin} theme={theme} onToggleTheme={toggleTheme} />}
      {currentScreen === "userTypeSelection" && (
        <UserTypeSelection onSelectUserType={handleSelectUserType} theme={theme} onToggleTheme={toggleTheme} />
      )}
      {currentScreen === "chat" && (
        <MainChatScreen userType={userType} onChangeUserType={handleChangeUserType} theme={theme} onToggleTheme={toggleTheme} />
      )}
    </div>
  );
}