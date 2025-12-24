import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { useState } from "react";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip/Message Bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="relative bg-white rounded-2xl shadow-premium p-4 pr-10 max-w-[240px]"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <X className="h-3 w-3 text-slate-500" />
            </button>
            <p className="text-slate-900 font-medium text-sm">
              👋 Need help planning your Zanzibar adventure?
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Chat with us on WhatsApp!
            </p>
            {/* Arrow */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href={COMPANY.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
      >
        <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" fill="currentColor" />
        
        {/* Ripple Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        
        {/* Glow Effect */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
        
        {/* Online Indicator */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm">
          <span className="absolute inset-0 rounded-full bg-green-400 animate-pulse" />
        </span>
      </motion.a>
    </div>
  );
}
