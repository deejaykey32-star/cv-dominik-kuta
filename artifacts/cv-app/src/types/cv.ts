export interface CVExperience {
  id: string;
  position: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface CVEducation {
  id: string;
  degree: string;
  school: string;
  period: string;
}

export interface CVData {
  name: string;
  title: string;
  phone: string;
  email: string;
  summary: string;
  experience: CVExperience[];
  skills: Record<string, string[]>;
  education: CVEducation[];
  languages: string[];
  interests: string[];
  additional: string[];
  rodo: string;
}

export const defaultCVData: CVData = {
  name: "Dominik Kuta",
  title: "Twórca treści cyfrowych | AI & Web Developer | Grafika & Multimedia | Digital Marketing",
  phone: "502 115 374",
  email: "kuta.dominik@gmail.com",
  summary: "Twórca treści cyfrowych z ponad 10-letnim doświadczeniem w budowie stron oraz aplikacji webowych i mobilnych, projektowaniu materiałów graficznych i multimedialnych oraz prowadzeniu działań marketingowych. Biegle posługuję się technologiami HTML, CSS, JavaScript, PHP, Flutter i Python, a także platformami CMS (WordPress, WooCommerce), CRM (Bitrix24), ERP (Odoo) oraz narzędziami low-code/no-code (Bubble.io, FlutterFlow). Łączę kompetencje techniczne z kreatywnością graficzną — Photoshop, Illustrator, Blender, Unity 3D — i aktywnie korzystam z narzędzi AI: ChatGPT, Gemini, Claude. Specjalizuję się w SEO/SEM, Google Ads, Facebook Ads oraz strategii e-marketingowej.",
  experience: [
    {
      id: "exp1",
      position: "Freelancer",
      company: "",
      period: "2016 – Obecnie",
      bullets: [
        "Programowanie aplikacji webowych, mobilnych (Flutter) i desktop",
        "Wdrożenia ERP/CRM/CMS/LMS: Odoo, Bitrix24, WordPress, Wix",
        "Tworzenie materiałów graficznych i multimedialnych",
        "Prowadzenie kampanii Google Ads i Facebook Ads"
      ]
    },
    {
      id: "exp2",
      position: "Administrator IT",
      company: "Magneti Marelli Aftermarket",
      period: "2015 – 2022",
      bullets: [
        "Obsługa sklepu online i produktów cyfrowych",
        "Projektowanie grafik i tworzenie materiałów marketingowych",
        "Tworzenie contentu: newslettery, opisy produktów, teksty reklamowe",
        "Rozwój aplikacji mobilnych (Apache Cordova)",
        "Projekty VR i zdjęcia 360°"
      ]
    },
    {
      id: "exp3",
      position: "Konstruktor i modelarz opakowań",
      company: "Skolik S.C.",
      period: "2004 – 2009",
      bullets: [
        "Projektowanie opakowań i makiet dla branży poligraficznej",
        "CAD: CorelDRAW, PackDesign, Adobe Photoshop, Illustrator",
        "Projektowanie wykrojników"
      ]
    }
  ],
  skills: {
    "Programowanie": ["HTML", "CSS", "JavaScript", "PHP", "Python", "Flutter/Dart/FlutterFlow", "Android Studio", "Xcode", "Bubble.io", "GIT"],
    "CMS/CRM/ERP": ["WordPress", "WooCommerce", "Odoo", "Bitrix24", "Google Cloud/Workspace", "Microsoft 365"],
    "Grafika & Multimedia": ["Photoshop", "Illustrator", "GIMP", "Canva", "Blender", "Unity 3D"],
    "Marketing": ["Google Ads", "Facebook Ads", "SEO", "SEM", "Social Media Marketing", "e-Marketing"],
    "AI Tools": ["ChatGPT", "Gemini", "Claude", "AI-assisted development"]
  },
  education: [
    {
      id: "edu1",
      degree: "Inżynier Informatyki — Grafika i Multimedia",
      school: "Wyższa Szkoła Informatyczno-Medyczna, Chorzów",
      period: "2006–2010"
    },
    {
      id: "edu2",
      degree: "Magister Inżynier Informatyki — Bazy Danych",
      school: "WSB, Dąbrowa Górnicza",
      period: "2010–2012"
    },
    {
      id: "edu3",
      degree: "Podyplomowe: Zarządzanie Projektami",
      school: "Wyższa Szkoła Bankowa, Chorzów",
      period: "2012–2013"
    },
    {
      id: "edu4",
      degree: "Podyplomowe: Tworzenie witryn i aplikacji internetowych",
      school: "Akademia Górniczo-Hutnicza, Kraków",
      period: "2013–2014"
    },
    {
      id: "edu5",
      degree: "Podyplomowe: e-Marketing",
      school: "Wyższa Szkoła Europejska, Kraków",
      period: "2015–2016"
    }
  ],
  languages: ["Język angielski: B2"],
  interests: ["Kultura (film, teatr, książka)", "Religia i filozofia", "Programowanie, grafika i multimedia", "Marketing"],
  additional: ["Orzeczenie o niepełnosprawności w stopniu umiarkowanym (specjalne)"],
  rodo: "Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w niniejszym CV na potrzeby prowadzenia procesu rekrutacji na stanowisko, na które aplikuję."
};
