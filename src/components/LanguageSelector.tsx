import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type Language = "en" | "it" | "de" | "ru" | "fr" | "es";

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const languages: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.tours": "Tours",
    "nav.mainlandSafaris": "Mainland Safaris",
    "nav.transfers": "Transfers",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.trackBooking": "Track Booking",
    
    // Hero
    "hero.title": "Discover Zanzibar",
    "hero.subtitle": "Experience the magic of the Spice Island with expert local guides",
    "hero.cta": "Explore Tours",
    
    // Tours
    "tours.title": "Our Tours",
    "tours.viewDetails": "View Details",
    "tours.bookNow": "Book Now",
    "tours.perPerson": "per person",
    "tours.duration": "Duration",
    "tours.includes": "Price Includes",
    
    // Common
    "common.learnMore": "Learn More",
    "common.contactUs": "Contact Us",
    "common.whatsapp": "WhatsApp Us",
    "common.from": "From",
    "common.hours": "hours",
    
    // Footer
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.followUs": "Follow Us",
  },
  it: {
    // Navigation
    "nav.home": "Home",
    "nav.tours": "Tour",
    "nav.mainlandSafaris": "Safari Tanzania",
    "nav.transfers": "Trasferimenti",
    "nav.about": "Chi Siamo",
    "nav.contact": "Contatti",
    "nav.trackBooking": "Traccia Prenotazione",
    
    // Hero
    "hero.title": "Scopri Zanzibar",
    "hero.subtitle": "Vivi la magia dell'Isola delle Spezie con guide locali esperte",
    "hero.cta": "Esplora i Tour",
    
    // Tours
    "tours.title": "I Nostri Tour",
    "tours.viewDetails": "Vedi Dettagli",
    "tours.bookNow": "Prenota Ora",
    "tours.perPerson": "a persona",
    "tours.duration": "Durata",
    "tours.includes": "Il Prezzo Include",
    
    // Common
    "common.learnMore": "Scopri di Più",
    "common.contactUs": "Contattaci",
    "common.whatsapp": "Scrivici su WhatsApp",
    "common.from": "Da",
    "common.hours": "ore",
    
    // Footer
    "footer.quickLinks": "Link Rapidi",
    "footer.contact": "Contatti",
    "footer.followUs": "Seguici",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.tours": "Touren",
    "nav.mainlandSafaris": "Festland-Safaris",
    "nav.transfers": "Transfers",
    "nav.about": "Über Uns",
    "nav.contact": "Kontakt",
    "nav.trackBooking": "Buchung Verfolgen",
    
    // Hero
    "hero.title": "Entdecken Sie Sansibar",
    "hero.subtitle": "Erleben Sie die Magie der Gewürzinsel mit erfahrenen lokalen Führern",
    "hero.cta": "Touren Erkunden",
    
    // Tours
    "tours.title": "Unsere Touren",
    "tours.viewDetails": "Details Ansehen",
    "tours.bookNow": "Jetzt Buchen",
    "tours.perPerson": "pro Person",
    "tours.duration": "Dauer",
    "tours.includes": "Im Preis Enthalten",
    
    // Common
    "common.learnMore": "Mehr Erfahren",
    "common.contactUs": "Kontaktieren Sie Uns",
    "common.whatsapp": "WhatsApp",
    "common.from": "Ab",
    "common.hours": "Stunden",
    
    // Footer
    "footer.quickLinks": "Schnelllinks",
    "footer.contact": "Kontakt",
    "footer.followUs": "Folgen Sie Uns",
  },
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.tours": "Туры",
    "nav.mainlandSafaris": "Сафари на материке",
    "nav.transfers": "Трансферы",
    "nav.about": "О нас",
    "nav.contact": "Контакты",
    "nav.trackBooking": "Отследить бронь",
    
    // Hero
    "hero.title": "Откройте Занзибар",
    "hero.subtitle": "Испытайте магию Острова специй с опытными местными гидами",
    "hero.cta": "Смотреть туры",
    
    // Tours
    "tours.title": "Наши туры",
    "tours.viewDetails": "Подробнее",
    "tours.bookNow": "Забронировать",
    "tours.perPerson": "с человека",
    "tours.duration": "Продолжительность",
    "tours.includes": "В стоимость входит",
    
    // Common
    "common.learnMore": "Узнать больше",
    "common.contactUs": "Связаться с нами",
    "common.whatsapp": "Написать в WhatsApp",
    "common.from": "От",
    "common.hours": "часов",
    
    // Footer
    "footer.quickLinks": "Быстрые ссылки",
    "footer.contact": "Контакты",
    "footer.followUs": "Мы в соцсетях",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.tours": "Tours",
    "nav.mainlandSafaris": "Safaris Continentaux",
    "nav.transfers": "Transferts",
    "nav.about": "À Propos",
    "nav.contact": "Contact",
    "nav.trackBooking": "Suivi Réservation",
    
    // Hero
    "hero.title": "Découvrez Zanzibar",
    "hero.subtitle": "Vivez la magie de l'île aux épices avec des guides locaux experts",
    "hero.cta": "Explorer les Tours",
    
    // Tours
    "tours.title": "Nos Tours",
    "tours.viewDetails": "Voir les Détails",
    "tours.bookNow": "Réserver",
    "tours.perPerson": "par personne",
    "tours.duration": "Durée",
    "tours.includes": "Le Prix Comprend",
    
    // Common
    "common.learnMore": "En Savoir Plus",
    "common.contactUs": "Contactez-Nous",
    "common.whatsapp": "WhatsApp",
    "common.from": "À partir de",
    "common.hours": "heures",
    
    // Footer
    "footer.quickLinks": "Liens Rapides",
    "footer.contact": "Contact",
    "footer.followUs": "Suivez-Nous",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.tours": "Tours",
    "nav.mainlandSafaris": "Safaris Continentales",
    "nav.transfers": "Traslados",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.trackBooking": "Rastrear Reserva",
    
    // Hero
    "hero.title": "Descubre Zanzíbar",
    "hero.subtitle": "Experimenta la magia de la Isla de las Especias con guías locales expertos",
    "hero.cta": "Explorar Tours",
    
    // Tours
    "tours.title": "Nuestros Tours",
    "tours.viewDetails": "Ver Detalles",
    "tours.bookNow": "Reservar Ahora",
    "tours.perPerson": "por persona",
    "tours.duration": "Duración",
    "tours.includes": "El Precio Incluye",
    
    // Common
    "common.learnMore": "Más Información",
    "common.contactUs": "Contáctenos",
    "common.whatsapp": "WhatsApp",
    "common.from": "Desde",
    "common.hours": "horas",
    
    // Footer
    "footer.quickLinks": "Enlaces Rápidos",
    "footer.contact": "Contacto",
    "footer.followUs": "Síguenos",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

interface LanguageSelectorProps {
  variant?: "icon" | "full";
  className?: string;
}

export function LanguageSelector({ variant = "icon", className }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={variant === "icon" ? "icon" : "sm"}
          className={className}
        >
          {variant === "icon" ? (
            <Globe className="h-5 w-5" />
          ) : (
            <span className="flex items-center gap-2">
              <span className="text-lg">{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.name}</span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? "bg-primary/10" : ""}`}
          >
            <span className="text-lg mr-2">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
