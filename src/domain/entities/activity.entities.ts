enum AccessibilityLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

enum PriceCategory {
  FREE = 'FREE',
  LOW = 'LOW',
  HIGH = 'HIGH'
}

interface BoredActivity {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
}

interface Activity {
  activity: string;
  accessibility: string;
  type: string;
  participants: number;
  price: string;
  link: string;
  key: string;
}

export { Activity, BoredActivity, AccessibilityLevel, PriceCategory };
