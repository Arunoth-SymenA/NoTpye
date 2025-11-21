import { Button } from "./ui/button";
import { LogIn, UserCircle } from "lucide-react";
import imgHalf11 from "figma:asset/068db720290439ec7c02e36d267168cb405bedac.png";

interface LoginScreenProps {
  onLogin: (method: 'google' | 'guest') => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function LoginScreen({ onLogin, theme, onToggleTheme }: LoginScreenProps) {
  const bgColor = theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const mutedTextColor = theme === 'dark' ? 'text-gray-400' : 'text-slate-600';
  
  return (
    <div className={`min-h-screen ${bgColor} relative flex items-center justify-center p-4`}>
      {/* Border */}
      <div aria-hidden="true" className="absolute border-[#a7013b] border-[2.5px] border-solid inset-0 pointer-events-none" />
      
      {/* Mode Button - Top Right */}
      <div className="absolute right-4 top-4">
        <div 
          onClick={onToggleTheme}
          className={`${bgColor} rounded-[12px] p-3 relative cursor-pointer`}
        >
          <div aria-hidden="true" className="absolute border-[#a7013b] border-[2.5px] border-solid inset-0 pointer-events-none rounded-[12px]" />
          <img src={imgHalf11} alt="" className="w-8 h-8 relative z-10" />
        </div>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 mx-auto relative">
            <svg className="w-full h-full" fill="none" viewBox="0 0 80 80">
              <circle cx="40" cy="40" fill={theme === 'dark' ? '#1E1E1E' : '#FFFFFF'} r="38" stroke="#A7013B" strokeWidth="2.5" />
            </svg>
            <LogIn className="w-10 h-10 text-[#a7013b] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <h1 className={`font-['Poppins',sans-serif] ${textColor} text-[25px] font-medium`}>
            Event Communication
          </h1>
          <p className={`font-['Poppins',sans-serif] ${mutedTextColor} text-[17px]`}>
            Connect with your team instantly during live events
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onLogin('google')}
            className={`w-full ${bgColor} rounded-[13px] py-4 relative flex items-center justify-center gap-3`}
          >
            <div aria-hidden="true" className="absolute border-[#a7013b] border-[2.5px] border-solid inset-0 pointer-events-none rounded-[13px]" />
            <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className={`font-['Poppins',sans-serif] ${textColor} text-[16px] relative z-10`}>
              Continue with Google
            </span>
          </button>

          <button
            onClick={() => onLogin('guest')}
            className={`w-full ${bgColor} rounded-[13px] py-4 relative flex items-center justify-center gap-3`}
          >
            <div aria-hidden="true" className="absolute border-[#a7013b] border-[2.5px] border-solid inset-0 pointer-events-none rounded-[13px]" />
            <UserCircle className="w-6 h-6 text-[#a7013b] relative z-10" />
            <span className={`font-['Poppins',sans-serif] ${textColor} text-[16px] relative z-10`}>
              Continue without Account
            </span>
          </button>
        </div>

        <p className={`text-center font-['Poppins',sans-serif] ${mutedTextColor} text-sm`}>
          Works on local network • Fast • Secure
        </p>
      </div>
    </div>
  );
}