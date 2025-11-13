import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Button, Box } from '@mui/material';
import darkBKGDTheme from './theme'; // Adjust the import path as needed

// Test component to verify theme application
const TestComponent = () => {
  return (
    <Box>
      <Typography variant="h1" data-testid="primary-text">
        Primary Text
      </Typography>
      <Typography variant="body1" data-testid="secondary-text">
        Secondary Text
      </Typography>
      <Button variant="contained" data-testid="primary-button">
        Primary Button
      </Button>
      <Box 
        sx={{ backgroundColor: 'background.default', padding: 2 }}
        data-testid="background-box"
      >
        Background Test
      </Box>
    </Box>
  );
};

describe('Dark Background Theme', () => {
  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider theme={darkBKGDTheme}>
        {component}
      </ThemeProvider>
    );
  };

  test('should render components with dark theme', () => {
    renderWithTheme(<TestComponent />);
    
    // Verify that components render without crashing
    expect(screen.getByTestId('primary-text')).toBeInTheDocument();
    expect(screen.getByTestId('secondary-text')).toBeInTheDocument();
    expect(screen.getByTestId('primary-button')).toBeInTheDocument();
    expect(screen.getByTestId('background-box')).toBeInTheDocument();
  });

  test('should apply dark mode palette', () => {
    // Test theme configuration
    expect(darkBKGDTheme.palette.mode).toBe('dark');
    expect(darkBKGDTheme.palette.common.black).toBe('#000000');
    expect(darkBKGDTheme.palette.common.white).toBe('#FFFFFF');
    expect(darkBKGDTheme.palette.primary.main).toBe('#1E1E1E');
  });

  test('should have correct primary color', () => {
    expect(darkBKGDTheme.palette.primary.main).toBe('#1E1E1E');
  });

  test('theme object should be valid', () => {
    // Verify theme structure
    expect(darkBKGDTheme).toHaveProperty('palette');
    expect(darkBKGDTheme.palette).toHaveProperty('mode');
    expect(darkBKGDTheme.palette).toHaveProperty('common');
    expect(darkBKGDTheme.palette).toHaveProperty('primary');
    
    // Verify common colors
    expect(darkBKGDTheme.palette.common).toEqual({
      black: '#000000',
      white: '#FFFFFF'
    });
  });
});

// Additional tests for theme consistency
describe('Theme Consistency', () => {
  test('should maintain consistent structure', () => {
    // Test that theme has all required Material-UI properties
    const requiredProperties = [
      'palette',
      'typography',
      'spacing',
      'breakpoints',
      'zIndex',
      'transitions',
      'components'
    ];

    requiredProperties.forEach(prop => {
      expect(darkBKGDTheme).toHaveProperty(prop);
    });
  });

  test('should have dark mode specific properties', () => {
    expect(darkBKGDTheme.palette.mode).toBe('dark');
    // In dark mode, background should be dark and text should be light
    expect(darkBKGDTheme.palette.background?.default).toBeDefined();
    expect(darkBKGDTheme.palette.text?.primary).toBeDefined();
  });
});

// Snapshot test for theme configuration
describe('Theme Snapshot', () => {
  test('theme configuration matches expected structure', () => {
    expect(darkBKGDTheme).toMatchObject({
      palette: {
        mode: 'dark',
        common: {
          black: '#000000',
          white: '#FFFFFF'
        },
        primary: {
          main: '#1E1E1E'
        }
      }
    });
  });
});
