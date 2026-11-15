"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3, Code2, Smartphone, Zap, Shield, TrendingUp, Users, Globe,
  Globe2, Layers, Share2, Search, Palette, Megaphone, Mail, Phone,
  MessageSquare, MapPin, Clock, Handshake, IndianRupee, CheckCircle,
  Rocket, Wrench, Target, Heart, GraduationCap, Building2, ShoppingCart,
  Factory, Landmark, Utensils, Award, Monitor, ShoppingBag, Settings,
  BookOpen, Lightbulb, MessageCircle, Store, Building, RefreshCw,
  ShieldCheck, Layout, BarChart2, Star, Check,
} from "lucide-react";

const ICON_MAP = {
  BarChart3, Code2, Smartphone, Zap, Shield, TrendingUp, Users, Globe,
  Globe2, Layers, Share2, Search, Palette, Megaphone, Mail, Phone,
  MessageSquare, MapPin, Clock, Handshake, IndianRupee, CheckCircle,
  Rocket, Wrench, Target, Heart, GraduationCap, Building2, ShoppingCart,
  Factory, Landmark, Utensils, Award, Monitor, ShoppingBag, Settings,
  BookOpen, Lightbulb, MessageCircle, Store, Building, RefreshCw,
  ShieldCheck, Layout, BarChart2, Star, Check,
};

const SIZE_MAP = {
  sm: { container: "px-3 py-2 gap-1.5", icon: 14, label: "text-xs",  desc: "text-[10px]", iconBox: "w-6 h-6" },
  md: { container: "px-4 py-3 gap-2",   icon: 16, label: "text-sm",  desc: "text-xs",     iconBox: "w-8 h-8" },
  lg: { container: "px-5 py-3.5 gap-2.5",icon:20, label: "text-sm",  desc: "text-xs",     iconBox: "w-10 h-10" },
};

export default function FloatingCard({
  icon = "Zap",
  label = "",
  description,
  type = "icon",
  delay = 0,
  floatDuration = 4,
  floatDistance = 10,
  position = {},
  size = "md",
}) {
  const reduced = useReducedMotion();
  const Icon    = ICON_MAP[icon] ?? Zap;
  const sz      = SIZE_MAP[size] ?? SIZE_MAP.md;

  const posStyle = {
    position: "absolute",
    willChange: "transform",
    ...position,
  };

  /* Entrance */
  const entrance = {
    initial:    { opacity: 0, scale: 0.8, y: 20 },
    animate:    { opacity: 1, scale: 1,   y: 0  },
    transition: { delay: delay + 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  /* Float — combines y-bob, x-sway and tiny rotation as separate motions */
  const floatY      = reduced ? undefined : { y: [0, -floatDistance, 0] };
  const floatYTr    = { duration: floatDuration,         repeat: Infinity, ease: "easeInOut", delay };
  const floatX      = reduced ? undefined : { x: [0, 4, 0, -4, 0] };
  const floatXTr    = { duration: floatDuration * 1.3,   repeat: Infinity, ease: "easeInOut", delay: delay + 0.2 };
  const floatRot    = reduced ? undefined : { rotate: [0, 1.5, 0, -1.5, 0] };
  const floatRotTr  = { duration: floatDuration * 1.7,   repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 };

  return (
    <motion.div
      aria-hidden="true"
      style={posStyle}
      {...entrance}
    >
      <motion.div
        animate={floatY}
        transition={floatYTr}
      >
        <motion.div
          animate={floatX}
          transition={floatXTr}
        >
          <motion.div
            animate={floatRot}
            transition={floatRotTr}
            whileHover={{ scale: 1.08, y: -4 }}
            className="cursor-default select-none"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#FC6E04";
              e.currentTarget.style.boxShadow   = "0 8px 30px rgba(252,110,4,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#EAE5DF";
              e.currentTarget.style.boxShadow   = "0 4px 20px rgba(0,0,0,0.06)";
            }}
            style={{
              display:         "inline-flex",
              alignItems:      "center",
              flexDirection:   description ? "row" : "row",
              gap:             sz.container.includes("gap-2.5") ? 10 : sz.container.includes("gap-2") ? 8 : 6,
              padding:         sz.container.includes("py-3.5") ? "14px 20px" : sz.container.includes("py-3") ? "12px 16px" : "8px 12px",
              background:      type === "glass" ? "rgba(255,255,255,0.80)" : "#fff",
              backdropFilter:  type === "glass" ? "blur(10px)" : undefined,
              border:          "1px solid #EAE5DF",
              borderRadius:    14,
              boxShadow:       "0 4px 20px rgba(0,0,0,0.06)",
              transition:      "border-color .2s ease, box-shadow .2s ease",
              zIndex:          10,
              whiteSpace:      "nowrap",
            }}
          >
            {/* Icon box */}
            <span
              style={{
                width:          sz.iconBox.includes("10") ? 40 : sz.iconBox.includes("8") ? 32 : 24,
                height:         sz.iconBox.includes("10") ? 40 : sz.iconBox.includes("8") ? 32 : 24,
                borderRadius:   8,
                background:     "#FFF0E4",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                flexShrink:     0,
              }}
            >
              <Icon size={sz.icon} color="#FC6E04" aria-hidden="true" />
            </span>

            {/* Text */}
            <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span
                style={{
                  fontSize:   size === "sm" ? 11 : 13,
                  fontWeight: 700,
                  color:      "#171717",
                  lineHeight: 1.2,
                }}
              >
                {label}
              </span>
              {description && (
                <span style={{ fontSize: 11, color: "#6B6B70", lineHeight: 1.3 }}>
                  {description}
                </span>
              )}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
