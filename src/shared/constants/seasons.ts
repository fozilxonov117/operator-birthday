export type Season = 'winter' | 'spring' | 'summer' | 'autumn';

export interface SeasonConfig {
  name: Season;
  months: number[]; // 1-12 (January = 1, December = 12)
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  background: {
    overlay: string;
    imageUrl: string;
  };
  monthCardColors: {
    unselected: string;
    selected: string;
  };
}

export const SEASON_CONFIG: Record<Season, SeasonConfig> = {
  winter: {
    name: 'winter',
    months: [12, 1, 2], // December, January, February
    colors: {
      primary: '#2196f3',
      secondary: '#64b5f6',
      accent: '#bbdefb',
      gradient: 'linear-gradient(135deg, rgba(33, 149, 243, 0.5) 0%, rgba(100, 181, 246, 0.85) 100%)',
    },
    background: {
      overlay: 'rgba(33, 150, 243, 0.1)',
      imageUrl: 'bg-images/winter-img.webp',
    },
    monthCardColors: {
      unselected: 'rgba(255, 255, 255, 0.5)',
      selected: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)',
    },
  },
  spring: {
    name: 'spring',
    months: [3, 4, 5], // March, April, May
    colors: {
      primary: '#0d9668ff',
      secondary: '#0d9668ff',
      accent: 'rgba(16, 185, 129, 0.1)',
      gradient: 'linear-gradient(135deg, rgb(114 236 64 / 2%) 0%, rgb(143 244 160 / 25%) 100%)',
    },
    background: {
      overlay: 'rgba(16, 185, 129, 0.1)',
      imageUrl: 'https://static.wikia.nocookie.net/c1002065-cf63-450b-9d94-4d51a3173dcc',
    },
    monthCardColors: {
      unselected: 'rgba(255, 255, 255, 0.5)',
      selected: 'linear-gradient(135deg, #10b98157 0%, #34d399c9 100%)',
    },
  },
  summer: {
    name: 'summer',
    months: [6, 7, 8], // June, July, August
    colors: {
      primary: '#ffa726',
      secondary: '#ffb74d',
      accent: '#ffcc80',
      gradient: 'linear-gradient(135deg, rgba(255, 215, 155, 0.36) 0%, rgba(255, 218, 163, 0.49) 100%)',
    },
    background: {
      overlay: 'rgba(255, 167, 38, 0.1)',
      imageUrl: 'https://i.pinimg.com/originals/8e/43/05/8e4305e5ca2524e022a75c5fdf0f1803.jpg',
    },
    monthCardColors: {
      unselected: 'rgba(255, 255, 255, 0.5)',
      selected: '#ffb84d36',
    },
  },
  autumn: {
    name: 'autumn',
    months: [9, 10, 11], // September, October, November
    colors: {
      primary: '#ff7043',
      secondary: '#ff8a65',
      accent: '#ffab91',
      gradient: 'rgba(252, 128, 90, 0)',
    },
    background: {
      overlay: 'rgba(255, 112, 67, 0.1)',
      imageUrl: 'bg-images/autumn-leaves.webp',
    },
    monthCardColors: {
      unselected: 'rgba(255, 255, 255, 0.5)',
      selected: 'linear-gradient(135deg, #ff7043 0%, #ff8a65 100%)',
    },
  },
};

/**
 * Get season based on month (0-11)
 */
export const getSeasonByMonth = (month: number): Season => {
  for (const [season, config] of Object.entries(SEASON_CONFIG)) {
    if (config.months.includes(month)) {
      return season as Season;
    }
  }
  return 'winter'; // Fallback
};

/**
 * Get season config by month
 */
export const getSeasonConfig = (month: number): SeasonConfig => {
  const season = getSeasonByMonth(month);
  return SEASON_CONFIG[season];
};
