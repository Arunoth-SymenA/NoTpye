import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Plus, Music, Mic, Radio, Users, Camera, UserCircle } from "lucide-react";
import { useState } from "react";
import imgHalf11 from "figma:asset/068db720290439ec7c02e36d267168cb405bedac.png";
import imgMic1 from "figma:asset/83fa2a619626e57ec012e45525de715295175ba9.png";
import imgMic2 from "figma:asset/dc87aafe64d013421bea2e99e570bea86147bee0.png";
import imgMic3 from "figma:asset/0b45b7fc5c066fc9e5c3129e80b9b6c668a7f88e.png";
import imgMic4 from "figma:asset/6ec696b7a498cc57d77a12ae34c71980e3cb33bb.png";
import imgMic5 from "figma:asset/a9a9fa5133d78cdae351724b32bfae15e98c66ca.png";
import imgMic6 from "figma:asset/1256eb23038a2db9ee51f31ab847faaa3e3d05a6.png";
import imgMic7 from "figma:asset/201b4775d2b6887eab0c3f4e8580cd77f55d0936.png";

interface UserTypeSelectionProps {
  onSelectUserType: (userType: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const defaultRoles = [
  { name: "Pastor", icon: imgMic7 },
  { name: "Host", icon: imgMic6 },
  { name: "Keys", icon: imgMic5 },
  { name: "A.Guitars", icon: imgMic5 },
  { name: "Bass", icon: imgMic5 },
  { name: "E.Guitar", icon: imgMic5 },
  { name: "Drummer", icon: imgMic3 },
  { name: "Media", icon: imgMic4 },
  { name: "Ushers", icon: imgMic1 },
  { name: "Parking", icon: imgMic1 },
  { name: "Custom Role", icon: imgMic2 },
];

export function UserTypeSelection({ onSelectUserType, theme, onToggleTheme }: UserTypeSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [customRole, setCustomRole] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const bgColor = theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const mutedTextColor = theme === 'dark' ? 'text-gray-500' : 'text-slate-600';
  const fillColor = theme === 'dark' ? '#1E1E1E' : '#FFFFFF';

  const handleContinue = () => {
    if (customRole) {
      onSelectUserType(customRole);
    } else if (selectedRole) {
      onSelectUserType(selectedRole);
    }
  };

  const handleRoleClick = (roleName: string) => {
    if (roleName === "Custom Role") {
      setShowCustomInput(true);
      setSelectedRole("");
    } else {
      setSelectedRole(roleName);
      setShowCustomInput(false);
      setCustomRole("");
    }
  };

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

      <div className="w-full max-w-4xl space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className={`font-['Poppins',sans-serif] ${textColor} text-[25px] font-medium`}>
            Select Your Role
          </h1>
          <p className={`font-['Poppins',sans-serif] ${textColor} text-[17px]`}>
            Choose your role to help others identify you
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {defaultRoles.map((role) => (
            <div
              key={role.name}
              onClick={() => handleRoleClick(role.name)}
              className={`${bgColor} rounded-[13px] p-6 cursor-pointer transition-all relative ${
                selectedRole === role.name ? "opacity-100" : "opacity-90 hover:opacity-100"
              }`}
            >
              <div aria-hidden="true" className={`absolute border-[#a7013b] border-[2.5px] border-solid inset-0 pointer-events-none rounded-[13px] ${
                selectedRole === role.name ? "opacity-100" : ""
              }`} />
              
              <div className="flex flex-col items-center gap-3 relative z-10">
                {/* Circular Icon */}
                <div className="relative">
                  <svg className="w-[61px] h-[61px]" fill="none" viewBox="0 0 61 61">
                    <circle cx="30.5" cy="30.5" fill={fillColor} r="29.25" stroke="#A7013B" strokeWidth="2.5" />
                  </svg>
                  <img 
                    src={role.icon} 
                    alt={role.name}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 object-contain"
                  />
                </div>
                
                <span className={`font-['Poppins',sans-serif] ${textColor} text-[17px] text-center`}>
                  {role.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Role Input */}
        {showCustomInput && (
          <div className="max-w-md mx-auto">
            <input
              type="text"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              placeholder="Enter custom role name"
              className={`w-full px-4 py-3 ${bgColor} border-[#a7013b] border-[2.5px] rounded-[13px] ${textColor} placeholder:${mutedTextColor} focus:outline-none font-['Poppins',sans-serif]`}
              autoFocus
            />
          </div>
        )}

        {/* Continue Button */}
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleContinue}
            disabled={!selectedRole && !customRole}
            className={`w-full ${bgColor} rounded-[13px] py-3 relative disabled:opacity-50`}
          >
            <div aria-hidden="true" className="absolute border-[#a7013b] border-[2.5px] border-solid inset-0 pointer-events-none rounded-[13px]" />
            <span className={`font-['Poppins',sans-serif] ${textColor} text-[16px] relative z-10`}>
              Continue
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}