import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import imgHalf11 from "figma:asset/068db720290439ec7c02e36d267168cb405bedac.png";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Send,
  Wifi,
  WifiOff,
  User,
  Check,
} from "lucide-react";

interface MainChatScreenProps {
  userType: string;
  onChangeUserType: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  presets: string[];
}

const categories: Category[] = [
  {
    id: "drinks",
    name: "Drinks",
    subcategories: [
      { id: "hot", name: "Hot", presets: ["Tea", "Coffee", "Hot Chocolate"] },
      { id: "cold", name: "Cold", presets: ["Water", "Juice", "Soda"] },
      { id: "warm", name: "Warm", presets: ["Warm Water", "Herbal Tea"] },
    ],
  },
  {
    id: "stage",
    name: "Stage",
    subcategories: [
      { id: "major", name: "Major", presets: ["Louder", "Softer", "Ready", "Stop"] },
      { id: "minor", name: "Minor", presets: ["Adjust Mic", "Change Song", "Repeat"] },
    ],
  },
  {
    id: "keys",
    name: "Keys",
    subcategories: [
      { id: "major-scale", name: "Major", presets: ["C Major", "D Major", "E Major", "G Major"] },
      { id: "minor-scale", name: "Minor", presets: ["A Minor", "D Minor", "E Minor"] },
    ],
  },
  {
    id: "band",
    name: "Band",
    subcategories: [
      { id: "tempo", name: "Tempo", presets: ["Faster", "Slower", "Keep Tempo"] },
      { id: "volume", name: "Volume", presets: ["Louder", "Softer", "Good Volume"] },
    ],
  },
  {
    id: "volunteers",
    name: "Volunteers",
    subcategories: [
      { id: "help", name: "Help Needed", presets: ["Need Assistance", "Clean Up", "Setup"] },
      { id: "break", name: "Break", presets: ["Taking Break", "Back Soon", "Available"] },
    ],
  },
  {
    id: "media",
    name: "Media",
    subcategories: [
      { id: "slides", name: "Slides", presets: ["Next Slide", "Previous Slide", "Hold Slide"] },
      { id: "recording", name: "Recording", presets: ["Start Recording", "Stop Recording"] },
    ],
  },
];

const recipients = [
  { id: "everyone", name: "Everyone" },
  { id: "pastor", name: "Pastor" },
  { id: "host", name: "Host" },
  { id: "keys", name: "Keys" },
  { id: "guitars", name: "A.Guitars" },
  { id: "bass", name: "Bass" },
  { id: "eguitar", name: "E.Guitar" },
  { id: "drummer", name: "Drummer" },
  { id: "media", name: "Media" },
  { id: "ushers", name: "Ushers" },
  { id: "parking", name: "Parking" },
];

export function MainChatScreen({ userType, onChangeUserType, theme, onToggleTheme }: MainChatScreenProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string>("");

  const bgColor = theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white';
  const bgSecondary = theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-gray-100';
  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-gray-300' : 'text-slate-700';
  const textMuted = theme === 'dark' ? 'text-gray-400' : 'text-slate-500';
  const hoverBg = theme === 'dark' ? 'hover:bg-[#2a2a2a]' : 'hover:bg-gray-50';
  const fillColor = theme === 'dark' ? '#1E1E1E' : '#FFFFFF';
  const borderMuted = theme === 'dark' ? 'border-gray-600' : 'border-slate-300';

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedSubcategory(null);
  };

  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategory(expandedSubcategory === subcategoryId ? null : subcategoryId);
  };

  const toggleRecipient = (recipientId: string) => {
    if (recipientId === "everyone") {
      setSelectedRecipients(["everyone"]);
    } else {
      const newRecipients = selectedRecipients.includes(recipientId)
        ? selectedRecipients.filter((id) => id !== recipientId)
        : [...selectedRecipients.filter((id) => id !== "everyone"), recipientId];
      setSelectedRecipients(newRecipients);
    }
  };

  const handleSendPreset = () => {
    if (selectedPreset && selectedRecipients.length > 0) {
      setSelectedPreset(null);
    }
  };

  const handleSendCustom = () => {
    if (customMessage.trim() && selectedRecipients.length > 0) {
      setPendingMessage(customMessage);
      setShowConfirmDialog(true);
    }
  };

  const confirmSendCustom = () => {
    setCustomMessage("");
    setPendingMessage("");
    setShowConfirmDialog(false);
  };

  const cancelSendCustom = () => {
    setPendingMessage("");
    setShowConfirmDialog(false);
  };

  return (
    <div className={`h-screen flex flex-col ${bgColor} relative`}>
      {/* Border */}
      <div aria-hidden="true" className="absolute border-[#a7013b] border-[2.5px] border-solid inset-0 pointer-events-none z-50" />
      
      {/* Header */}
      <div className={`${bgColor} border-b border-[#a7013b] px-4 py-4 flex items-center justify-between relative z-10`}>
        <div className="flex items-center gap-3">
          <div 
            onClick={onChangeUserType}
            className="w-12 h-12 rounded-full cursor-pointer relative"
          >
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48">
              <circle cx="24" cy="24" fill={fillColor} r="22.75" stroke="#A7013B" strokeWidth="2.5" />
            </svg>
            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Poppins',sans-serif] ${textColor}`}>
              {userType.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className={`font-['Poppins',sans-serif] ${textColor} text-[17px]`}>{userType}</div>
            <div className={`flex items-center gap-1 ${textMuted}`}>
              {isConnected ? (
                <>
                  <Wifi className="w-3 h-3 text-[#a7013b]" />
                  <span className="text-xs font-['Poppins',sans-serif]">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-red-600" />
                  <span className="text-xs font-['Poppins',sans-serif]">Offline</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Buttons Container */}
        <div className="flex items-center gap-2">
          {/* WiFi Button */}
          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`${bgColor} rounded-[12px] p-2 relative cursor-pointer`}
          >
            <div aria-hidden="true" className="absolute border-[#a7013b] border-[2.5px] border-solid inset-0 pointer-events-none rounded-[12px]" />
            {isConnected ? (
              <Wifi className="w-6 h-6 text-[#a7013b] relative z-10" />
            ) : (
              <WifiOff className="w-6 h-6 text-red-600 relative z-10" />
            )}
          </button>
          
          {/* Mode Button */}
          <button
            onClick={onToggleTheme}
            className={`${bgColor} rounded-[12px] p-2 relative cursor-pointer`}
          >
            <div aria-hidden="true" className="absolute border-[#a7013b] border-[2.5px] border-solid inset-0 pointer-events-none rounded-[12px]" />
            <img src={imgHalf11} alt="" className="w-6 h-6 relative z-10" />
          </button>
        </div>
      </div>

      {/* Main Content - Two Panels */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Message Categories */}
        <div className={`w-1/2 border-r border-[#a7013b] ${bgColor} flex flex-col`}>
          <div className="px-4 py-3 border-b border-[#a7013b] flex items-center justify-between">
            <span className={`font-['Poppins',sans-serif] ${textColor} text-[17px]`}>Quick Messages</span>
            <button className="w-8 h-8 rounded-full relative">
              <svg className="w-full h-full" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" fill={fillColor} r="15" stroke="#A7013B" strokeWidth="2" />
              </svg>
              <Plus className="w-4 h-4 text-[#a7013b] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </button>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {categories.map((category) => {
                const isExpanded = expandedCategory === category.id;
                return (
                  <div key={category.id} className="space-y-1">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-[8px] ${bgColor} ${hoverBg} transition-colors relative`}
                    >
                      <div aria-hidden="true" className="absolute border-[#a7013b] border border-solid inset-0 pointer-events-none rounded-[8px]" />
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-[#a7013b] relative z-10" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[#a7013b] relative z-10" />
                      )}
                      <span className={`font-['Poppins',sans-serif] ${textColor} relative z-10`}>{category.name}</span>
                    </button>

                    {isExpanded && (
                      <div className="ml-6 space-y-1">
                        {category.subcategories.map((subcategory) => {
                          const isSubExpanded = expandedSubcategory === subcategory.id;
                          return (
                            <div key={subcategory.id} className="space-y-1">
                              <button
                                onClick={() => toggleSubcategory(subcategory.id)}
                                className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-[8px] ${hoverBg} transition-colors`}
                              >
                                {isSubExpanded ? (
                                  <ChevronDown className={`w-3 h-3 ${textMuted}`} />
                                ) : (
                                  <ChevronRight className={`w-3 h-3 ${textMuted}`} />
                                )}
                                <span className={`font-['Poppins',sans-serif] ${textSecondary}`}>{subcategory.name}</span>
                              </button>

                              {isSubExpanded && (
                                <div className="ml-5 space-y-1">
                                  {subcategory.presets.map((preset) => (
                                    <button
                                      key={preset}
                                      onClick={() => setSelectedPreset(preset)}
                                      className={`w-full text-left px-3 py-1.5 text-sm rounded-[8px] transition-all relative ${
                                        selectedPreset === preset
                                          ? bgSecondary
                                          : hoverBg
                                      }`}
                                    >
                                      {selectedPreset === preset && (
                                        <div aria-hidden="true" className="absolute border-[#a7013b] border border-solid inset-0 pointer-events-none rounded-[8px]" />
                                      )}
                                      <span className={`font-['Poppins',sans-serif] ${textSecondary} relative z-10`}>{preset}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel - Recipients */}
        <div className={`w-1/2 ${bgColor} flex flex-col`}>
          <div className="px-4 py-3 border-b border-[#a7013b]">
            <span className={`font-['Poppins',sans-serif] ${textColor} text-[17px]`}>Send To</span>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {recipients.map((recipient) => {
                const isSelected = selectedRecipients.includes(recipient.id);
                return (
                  <button
                    key={recipient.id}
                    onClick={() => toggleRecipient(recipient.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-[8px] transition-all relative ${
                      isSelected ? bgSecondary : hoverBg
                    }`}
                  >
                    {isSelected && (
                      <div aria-hidden="true" className="absolute border-[#a7013b] border border-solid inset-0 pointer-events-none rounded-[8px]" />
                    )}
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center relative z-10 ${
                        isSelected
                          ? "bg-[#a7013b] border-[#a7013b]"
                          : borderMuted
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <User className={`w-4 h-4 ${textMuted} relative z-10`} />
                    <span className={`font-['Poppins',sans-serif] ${textColor} relative z-10`}>{recipient.name}</span>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Message Preview & Send Area */}
      <div className={`${bgColor} border-t border-[#a7013b] p-4 space-y-3`}>
        {selectedPreset && (
          <div className={`${bgSecondary} rounded-[13px] p-3 relative`}>
            <div aria-hidden="true" className="absolute border-[#a7013b] border border-solid inset-0 pointer-events-none rounded-[13px]" />
            <div className="flex items-start justify-between gap-2 relative z-10">
              <div className="flex-1 space-y-2">
                <div className={`font-['Poppins',sans-serif] ${textColor}`}>{selectedPreset}</div>
                <div className="flex flex-wrap gap-1">
                  {selectedRecipients.map((id) => {
                    const recipient = recipients.find((r) => r.id === id);
                    return (
                      <span 
                        key={id} 
                        className="px-2 py-0.5 bg-[#a7013b] rounded text-xs font-['Poppins',sans-serif] text-white"
                      >
                        {recipient?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={handleSendPreset}
                disabled={selectedRecipients.length === 0}
                className="bg-[#a7013b] hover:bg-[#8a0130] disabled:opacity-50 px-4 py-2 rounded-[8px] flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-white" />
                <span className="font-['Poppins',sans-serif] text-white text-sm">Send</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendCustom()}
            placeholder="Type custom message..."
            className={`flex-1 px-4 py-3 ${bgColor} border-[#a7013b] border-[2.5px] rounded-[13px] ${textColor} placeholder:${textMuted} focus:outline-none font-['Poppins',sans-serif]`}
          />
          <button
            onClick={handleSendCustom}
            disabled={!customMessage.trim() || selectedRecipients.length === 0}
            className="bg-[#a7013b] hover:bg-[#8a0130] disabled:opacity-50 px-6 py-3 rounded-[13px] relative"
          >
            <div aria-hidden="true" className="absolute border-[#a7013b] border-[2.5px] border-solid inset-0 pointer-events-none rounded-[13px]" />
            <Send className="w-5 h-5 text-white relative z-10" />
          </button>
        </div>
      </div>

      {/* Confirm Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className={`${bgColor} border-[#a7013b] border-[2.5px]`}>
          <AlertDialogHeader>
            <AlertDialogTitle className={`font-['Poppins',sans-serif] ${textColor} text-[20px]`}>
              Confirm Message
            </AlertDialogTitle>
            <AlertDialogDescription className={`font-['Poppins',sans-serif] ${textMuted}`}>
              Are you sure you want to send the following message?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className={`p-4 ${bgSecondary} rounded-[8px] space-y-2`}>
            <div className={`font-['Poppins',sans-serif] ${textColor} text-[17px]`}>{pendingMessage}</div>
            <div className="flex flex-wrap gap-1">
              {selectedRecipients.map((id) => {
                const recipient = recipients.find((r) => r.id === id);
                return (
                  <span 
                    key={id} 
                    className="px-2 py-0.5 bg-[#a7013b] rounded text-xs font-['Poppins',sans-serif] text-white"
                  >
                    {recipient?.name}
                  </span>
                );
              })}
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={cancelSendCustom}
              className={`${bgColor} border-[#a7013b] border-[2px] ${textColor} hover:${bgSecondary} font-['Poppins',sans-serif]`}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmSendCustom}
              className="bg-[#a7013b] hover:bg-[#8a0130] text-white font-['Poppins',sans-serif]"
            >
              Send
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
