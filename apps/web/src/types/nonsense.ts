export type NonsenseTip = {
  selector: string;
  text: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  pages?: string[];
  oncePerSession?: boolean;
};

export type ClorgLine = {
  text: string;
  ctas?: { 
    label: string; 
    action: 'dismiss' | 'navigate' | 'open-modal'; 
    href?: string 
  }[];
};

export type NonsenseData = {
  ticker: string[];
  tooltips: NonsenseTip[];
  clorg: {
    lines: ClorgLine[];
    weights: {
      base: number;
      enterpriseMultiplier: number;
    };
  };
};

export type AnalyticsEvent = {
  type: 'tooltip' | 'clorg';
  id: string;
  variant: 'A' | 'B';
  enterprise: boolean;
  path: string;
  timestamp: number;
};
