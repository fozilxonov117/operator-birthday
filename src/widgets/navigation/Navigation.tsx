import { AppBar, Toolbar, Typography } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';
import type { SeasonConfig } from '../../shared/constants/seasons';

interface NavigationProps {
  seasonConfig: SeasonConfig;
}

export const Navigation = ({ seasonConfig }: NavigationProps) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: `linear-gradient(90deg, ${seasonConfig.colors.primary} 0%, ${seasonConfig.colors.secondary} 100%)`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        zIndex: 1100,
        transition: 'background 0.5s ease',
        borderRadius: 0,
      }}
    >
      <Toolbar>
        <CakeIcon sx={{ mr: 2, fontSize: 32 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Birthday Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
