import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { Favorite, Settings } from '@mui/icons-material';
import darkBKGDTheme from './theme'; // Adjust the import path as needed

// Test components
const IconButtonTestComponent = () => {
  return (
    <div>
      <IconButton data-testid="normal-icon-button" aria-label="normal">
        <Favorite />
      </IconButton>
      <IconButton data-testid="disabled-icon-button" disabled aria-label="disabled">
        <Settings />
      </IconButton>
    </div>
  );
};

describe('MuiIconButton Theme Overrides', () => {
  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider theme={darkBKGDTheme}>
        {component}
      </ThemeProvider>
    );
  };

  test('should apply correct color to normal IconButton', () => {
    renderWithTheme(<IconButtonTestComponent />);
    
    const normalIconButton = screen.getByTestId('normal-icon-button');
    
    // Verify the component renders
    expect(normalIconButton).toBeInTheDocument();
    
    // Check computed styles for color
    const computedStyle = window.getComputedStyle(normalIconButton);
    expect(computedStyle.color).toBe('rgba(255, 255, 255, 0.6)');
  });

  test('should apply disabled color to disabled IconButton', () => {
    renderWithTheme(<IconButtonTestComponent />);
    
    const disabledIconButton = screen.getByTestId('disabled-icon-button');
    
    // Verify the component renders and is disabled
    expect(disabledIconButton).toBeInTheDocument();
    expect(disabledIconButton).toBeDisabled();
    expect(disabledIconButton).toHaveClass('Mui-disabled');
    
    // Check computed styles for disabled color
    const computedStyle = window.getComputedStyle(disabledIconButton);
    
    // Since disabledTextColor is a variable, we need to check if it's applied
    // This will depend on what disabledTextColor resolves to in your theme
    expect(computedStyle.color).not.toBe('rgba(255, 255, 255, 0.6)');
  });

  test('theme should have IconButton style overrides configured', () => {
    // Test theme configuration directly
    expect(darkBKGDTheme.components?.MuiIconButton).toBeDefined();
    expect(darkBKGDTheme.components.MuiIconButton.styleOverrides).toBeDefined();
    expect(darkBKGDTheme.components.MuiIconButton.styleOverrides.root).toBeDefined();
  });

  test('should verify root style overrides structure', () => {
    const iconButtonOverrides = darkBKGDTheme.components?.MuiIconButton?.styleOverrides;
    
    expect(iconButtonOverrides).toMatchObject({
      root: {
        color: 'rgba(255, 255, 255, 0.60)',
        '&.Mui-disabled': {
          color: expect.any(String) // disabledTextColor variable
        }
      }
    });
  });
});

// Snapshot tests for theme configuration
describe('IconButton Theme Snapshot', () => {
  test('IconButton theme overrides match expected structure', () => {
    expect(darkBKGDTheme.components?.MuiIconButton).toMatchSnapshot();
  });

  test('IconButton root styles are correctly configured', () => {
    const rootStyles = darkBKGDTheme.components?.MuiIconButton?.styleOverrides?.root;
    
    expect(rootStyles).toEqual({
      color: 'rgba(255, 255, 255, 0.60)',
      '&.Mui-disabled': {
        color: expect.any(String)
      }
    });
  });
});

// Integration test with different IconButton states
describe('IconButton States Integration', () => {
  test('different IconButton states use correct colors', () => {
    const { container } = renderWithTheme(<IconButtonTestComponent />);
    
    const iconButtons = container.querySelectorAll('.MuiIconButton-root');
    expect(iconButtons).toHaveLength(2);
    
    // First button (normal state)
    const normalButton = iconButtons[0];
    const normalStyle = window.getComputedStyle(normalButton);
    expect(normalStyle.color).toBe('rgba(255, 255, 255, 0.6)');
    
    // Second button (disabled state)
    const disabledButton = iconButtons[1];
    const disabledStyle = window.getComputedStyle(disabledButton);
    // The color should be different from the normal state
    expect(disabledStyle.color).not.toBe('rgba(255, 255, 255, 0.6)');
  });
});

// Test for hover and focus states if they exist in your theme
describe('IconButton Interactive States', () => {
  test('IconButton maintains theme consistency across states', () => {
    renderWithTheme(
      <IconButton data-testid="interactive-icon-button" aria-label="interactive">
        <Favorite />
      </IconButton>
    );
    
    const iconButton = screen.getByTestId('interactive-icon-button');
    const initialColor = window
