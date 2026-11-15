/**
 * Floating element configs for each page hero.
 * Each array entry maps to a FloatingCard component.
 */
export const heroElements = {
  about: {
    centerIcon:  "Building2",
    centerLabel: "Since 2019",
    elements: [
      { icon: "BarChart3",  label: "Analytics",   type: "glass",  position: { top: "5%",    right: "10%" }, floatDuration: 4,   floatDistance: 12, delay: 0   },
      { icon: "Code2",      label: "Clean Code",  type: "icon",   position: { top: "15%",   right: "55%" }, floatDuration: 5,   floatDistance: 8,  delay: 0.5 },
      { icon: "Smartphone", label: "Mobile",      type: "badge",  position: { bottom: "25%",right: "5%"  }, floatDuration: 3.5, floatDistance: 15, delay: 1   },
      { icon: "Zap",        label: "Performance", type: "icon",   position: { bottom: "10%",right: "45%" }, floatDuration: 6,   floatDistance: 10, delay: 1.5 },
      { icon: "Shield",     label: "Secure",      type: "glass",  position: { top: "45%",   right: "0%"  }, floatDuration: 4.5, floatDistance: 6,  delay: 0.8 },
      { icon: "TrendingUp", label: "Growth",      type: "stat",   description: "30+ Projects", position: { top: "60%", right: "55%" }, floatDuration: 5.5, floatDistance: 14, delay: 0.3 },
      { icon: "Users",      label: "Clients",     type: "badge",  position: { top: "0%",    right: "35%" }, floatDuration: 4.2, floatDistance: 9,  delay: 1.2 },
      { icon: "Globe",      label: "Digital",     type: "icon",   position: { bottom: "5%", right: "25%" }, floatDuration: 5.8, floatDistance: 11, delay: 0.6 },
    ],
  },

  services: {
    centerIcon:  "Layers",
    centerLabel: "7 Services",
    elements: [
      { icon: "Globe",      label: "Web Dev",    position: { top: "0%",    right: "15%" }, floatDuration: 4,   floatDistance: 10, delay: 0   },
      { icon: "Smartphone", label: "App Dev",    position: { top: "20%",   right: "55%" }, floatDuration: 5,   floatDistance: 8,  delay: 0.3 },
      { icon: "Code2",      label: "Software",   position: { top: "50%",   right: "0%"  }, floatDuration: 3.5, floatDistance: 12, delay: 0.6 },
      { icon: "Share2",     label: "SMM",        position: { bottom: "20%",right: "50%" }, floatDuration: 6,   floatDistance: 7,  delay: 0.9 },
      { icon: "Search",     label: "SEO",        position: { bottom: "5%", right: "10%" }, floatDuration: 4.5, floatDistance: 14, delay: 1.2 },
      { icon: "Palette",    label: "Design",     position: { top: "35%",   right: "60%" }, floatDuration: 5.5, floatDistance: 9,  delay: 0.4 },
      { icon: "Megaphone",  label: "Marketing",  position: { bottom: "35%",right: "5%"  }, floatDuration: 4.8, floatDistance: 11, delay: 0.7 },
    ],
  },

  contact: {
    centerIcon:  "MessageCircle",
    centerLabel: "Let's Talk",
    elements: [
      { icon: "Mail",         label: "Email",    position: { top: "5%",    right: "10%" }, floatDuration: 4,   floatDistance: 10, delay: 0   },
      { icon: "Phone",        label: "Call",     position: { top: "25%",   right: "55%" }, floatDuration: 5,   floatDistance: 8,  delay: 0.5 },
      { icon: "MessageSquare",label: "WhatsApp", position: { bottom: "20%",right: "5%"  }, floatDuration: 3.5, floatDistance: 12, delay: 1   },
      { icon: "MapPin",       label: "Jaipur",   position: { bottom: "10%",right: "50%" }, floatDuration: 6,   floatDistance: 7,  delay: 0.3 },
      { icon: "Clock",        label: "24h Reply",position: { top: "50%",   right: "0%"  }, floatDuration: 4.5, floatDistance: 14, delay: 0.8 },
      { icon: "Handshake",    label: "Trust",    position: { top: "0%",    right: "35%" }, floatDuration: 5.5, floatDistance: 9,  delay: 1.2 },
    ],
  },

  pricing: {
    centerIcon:  "IndianRupee",
    centerLabel: "Fair Pricing",
    elements: [
      { icon: "CheckCircle", label: "No Hidden Cost", type: "badge", position: { top: "5%",    right: "10%" }, floatDuration: 4,   floatDistance: 10, delay: 0   },
      { icon: "Rocket",      label: "Fast Delivery",                 position: { top: "20%",   right: "55%" }, floatDuration: 5,   floatDistance: 12, delay: 0.4 },
      { icon: "Shield",      label: "Secure",         type: "glass", position: { bottom: "25%",right: "5%"  }, floatDuration: 3.5, floatDistance: 8,  delay: 0.8 },
      { icon: "Wrench",      label: "Free Support",                  position: { bottom: "10%",right: "45%" }, floatDuration: 6,   floatDistance: 14, delay: 1.2 },
      { icon: "Zap",         label: "Performance",                   position: { top: "45%",   right: "0%"  }, floatDuration: 4.5, floatDistance: 6,  delay: 0.6 },
      { icon: "Target",      label: "Results",        type: "stat",  description: "100% ROI", position: { top: "60%", right: "55%" }, floatDuration: 5.5, floatDistance: 11, delay: 0.2 },
    ],
  },

  industries: {
    centerIcon:  "Globe2",
    centerLabel: "9 Industries",
    elements: [
      { icon: "Heart",        label: "Healthcare",   position: { top: "5%",    right: "10%" }, floatDuration: 4,   floatDistance: 10, delay: 0   },
      { icon: "GraduationCap",label: "Education",    position: { top: "20%",   right: "55%" }, floatDuration: 5,   floatDistance: 8,  delay: 0.3 },
      { icon: "Building2",    label: "Real Estate",  position: { bottom: "20%",right: "5%"  }, floatDuration: 3.5, floatDistance: 12, delay: 0.6 },
      { icon: "ShoppingCart", label: "E-Commerce",   position: { bottom: "10%",right: "50%" }, floatDuration: 6,   floatDistance: 7,  delay: 0.9 },
      { icon: "Factory",      label: "Manufacturing",position: { top: "45%",   right: "0%"  }, floatDuration: 4.5, floatDistance: 14, delay: 1.2 },
      { icon: "Landmark",     label: "Finance",      position: { top: "0%",    right: "35%" }, floatDuration: 5.5, floatDistance: 9,  delay: 0.4 },
      { icon: "Utensils",     label: "Food & Bev",   position: { bottom: "35%",right: "60%" }, floatDuration: 4.8, floatDistance: 11, delay: 0.7 },
    ],
  },

  portfolio: {
    centerIcon:  "Award",
    centerLabel: "Our Work",
    elements: [
      { icon: "Monitor",     label: "Web",       type: "glass", position: { top: "5%",    right: "10%" }, floatDuration: 4,   floatDistance: 10, delay: 0   },
      { icon: "Smartphone",  label: "Mobile",                   position: { top: "25%",   right: "55%" }, floatDuration: 5,   floatDistance: 12, delay: 0.5 },
      { icon: "ShoppingBag", label: "E-Com",                    position: { bottom: "20%",right: "5%"  }, floatDuration: 3.5, floatDistance: 8,  delay: 1   },
      { icon: "Palette",     label: "Design",                   position: { bottom: "10%",right: "45%" }, floatDuration: 6,   floatDistance: 14, delay: 0.3 },
      { icon: "BarChart3",   label: "Analytics",                position: { top: "50%",   right: "0%"  }, floatDuration: 4.5, floatDistance: 6,  delay: 0.8 },
      { icon: "Settings",    label: "Custom",                   position: { top: "0%",    right: "35%" }, floatDuration: 5.5, floatDistance: 11, delay: 1.2 },
    ],
  },

  blog: {
    centerIcon:  "BookOpen",
    centerLabel: "Insights",
    elements: [
      { icon: "Lightbulb",  label: "Ideas",     type: "glass", position: { top: "5%",    right: "10%" }, floatDuration: 4,   floatDistance: 10, delay: 0   },
      { icon: "Search",     label: "SEO Tips",                 position: { top: "20%",   right: "55%" }, floatDuration: 5,   floatDistance: 8,  delay: 0.4 },
      { icon: "Code2",      label: "Dev",                      position: { bottom: "25%",right: "5%"  }, floatDuration: 3.5, floatDistance: 12, delay: 0.8 },
      { icon: "TrendingUp", label: "Growth",                   position: { bottom: "10%",right: "50%" }, floatDuration: 6,   floatDistance: 7,  delay: 1.2 },
      { icon: "Zap",        label: "Speed",                    position: { top: "45%",   right: "0%"  }, floatDuration: 4.5, floatDistance: 14, delay: 0.6 },
      { icon: "Target",     label: "Strategy",                 position: { top: "60%",   right: "55%" }, floatDuration: 5.5, floatDistance: 9,  delay: 0.2 },
    ],
  },
};
