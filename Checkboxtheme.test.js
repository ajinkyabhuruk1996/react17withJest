import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { Checkbox, FormControlLabel, Box } from '@mui/material';
import darkBKGDTheme from './theme';

// Test components
const CheckboxTestComponent = () => {
  return (
    <Box data-testid="checkbox-container">
      {/* Default checkbox */}
      <FormControlLabel
        control={<Checkbox data-testid="default-checkbox" />}
        label="Default Checkbox"
      />
      
      {/* Checked checkbox */}
      <FormControlLabel
        control={<Checkbox data-testid="checked-checkbox" defaultChecked />}
        label="Checked Checkbox"
      />
      
      {/* Disabled checkbox */}
      <FormControlLabel
        control={<Checkbox data-testid="disabled-checkbox" disabled />}
        label="Disabled Checkbox"
      />
      
      {/* Disabled checked checkbox */}
      <FormControlLabel
        control={<Checkbox data-testid="disabled-checked-checkbox" defaultChecked disabled />}
        label="Disabled Checked Checkbox"
      />
      
      {/* Primary color checkbox */}
      <FormControlLabel
        control={<Checkbox data-testid="primary-checkbox" color="primary" />}
        label="Primary Checkbox"
      />
      
      {/* Primary checked checkbox */}
      <FormControlLabel
        control={<Checkbox data-testid="primary-checked-checkbox" color="primary" defaultChecked />}
        label="Primary Checked Checkbox"
      />
      
      {/* Secondary color checkbox */}
      <FormControlLabel
        control={<Checkbox data-testid="secondary-checkbox" color="secondary" />}
        label="Secondary Checkbox"
      />
      
      {/* Secondary checked checkbox */}
      <FormControlLabel
        control={<Checkbox data-testid="secondary-checked-checkbox" color="secondary" defaultChecked />}
        label="Secondary Checked Checkbox"
      />
      
      {/* Disabled primary checkbox */}
      <FormControlLabel
        control={<Checkbox data-testid="disabled-primary-checkbox" color="primary" disabled />}
        label="Disabled Primary Checkbox"
      />
    </Box>
  );
};

describe('MuiCheckbox Theme Overrides', () => {
  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider theme={darkBKGDTheme}>
        {component}
      </ThemeProvider>
    );
  };

  // Test root styles
  describe('Checkbox Root Styles', () => {
    test('default checkbox should use secondaryTextColor', () => {
      renderWithTheme(<CheckboxTestComponent />);
      
      const defaultCheckbox = screen.getByTestId('default-checkbox');
      const inputElement = defaultCheckbox.querySelector('input');
      
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).not.toBeChecked();
      
      // The color should be secondaryTextColor for unchecked state
      const svgElement = defaultCheckbox.querySelector('svg');
      expect(svgElement).toBeInTheDocument();
    });

    test('checked checkbox should use white color', () => {
      renderWithTheme(<CheckboxTestComponent />);
      
      const checkedCheckbox = screen.getByTestId('checked-checkbox');
      const inputElement = checkedCheckbox.querySelector('input');
      
      expect(inputElement).toBeChecked();
      expect(checkedCheckbox).toHaveClass('Mui-checked');
    });

    test('disabled checkbox should use rgba(255, 255, 255, .15)', () => {
      renderWithTheme(<CheckboxTestComponent />);
      
      const disabledCheckbox = screen.getByTestId('disabled-checkbox');
      const inputElement = disabledCheckbox.querySelector('input');
      
      expect(inputElement).toBeDisabled();
      expect(disabledCheckbox).toHaveClass('Mui-disabled');
    });

    test('disabled checked checkbox should have correct classes', () => {
      renderWithTheme(<CheckboxTestComponent />);
      
      const disabledCheckedCheckbox = screen.getByTestId('disabled-checked-checkbox');
      const inputElement = disabledCheckedCheckbox.querySelector('input');
      
      expect(inputElement).toBeChecked();
      expect(inputElement).toBeDisabled();
      expect(disabledCheckedCheckbox).toHaveClass('Mui-checked');
      expect(disabledCheckedCheckbox).toHaveClass('Mui-disabled');
    });
  });

  // Test colorPrimary styles
  describe('Primary Color Checkbox', () => {
    test('primary checkbox should use white color', () => {
      renderWithTheme(<CheckboxTestComponent />);
      
      const primaryCheckbox = screen.getByTestId('primary-checkbox');
      expect(primaryCheckbox).toBeInTheDocument();
    });

    test('primary checked checkbox should use white color', () => {
      renderWithTheme(<CheckboxTestComponent />);
      
      const primaryCheckedCheckbox = screen.getByTestId('primary-checked-checkbox');
      const inputElement = primaryCheckedCheckbox.querySelector('input');
      
      expect(inputElement).toBeChecked();
      expect(primaryCheckedCheckbox).toHaveClass('Mui-checked');
    });
  });

  // Test colorSecondary styles
  describe('Secondary Color Checkbox', () => {
    test('secondary checkbox should use greenColor', () => {
      renderWithTheme(<CheckboxTestComponent />);
      
      const secondaryCheckbox = screen.getByTestId('secondary-checkbox');
      expect(secondaryCheckbox).toBeInTheDocument();
    });

    test('secondary checked checkbox should use greenColor', () => {
      renderWithTheme(<CheckboxTestComponent />);
      
      const secondaryCheckedCheckbox = screen.getByTestId('secondary-checked-checkbox');
      const inputElement = secondaryCheckedCheckbox.querySelector('input');
      
      expect(inputElement).toBeChecked();
      expect(secondaryCheckedCheckbox).toHaveClass('Mui-checked');
    });
  });

  // Test theme configuration
  describe('Theme Configuration', () => {
    test('should have Checkbox style overrides configured', () => {
      expect(darkBKGDTheme.components?.MuiCheckbox).toBeDefined();
      expect(darkBKGDTheme.components.MuiCheckbox.styleOverrides).toBeDefined();
      
      const styleOverrides = darkBKGDTheme.components.MuiCheckbox.styleOverrides;
      expect(styleOverrides.root).toBeDefined();
      expect(styleOverrides.colorPrimary).toBeDefined();
      expect(styleOverrides.colorSecondary).toBeDefined();
    });

    test('should verify root style overrides structure', () => {
      const rootOverrides = darkBKGDTheme.components?.MuiCheckbox?.styleOverrides?.root;
      
      expect(rootOverrides).toMatchObject({
        color: expect.any(String), // secondaryTextColor
        '&.Mui-checked:not(.Mui-disabled)': {
          color: expect.any(String) // white
        },
        '&.Mui-disabled': {
          color: 'rgba(255, 255, 255, .15)'
        }
      });
    });

    test('should verify colorPrimary style overrides structure', () => {
      const primaryOverrides = darkBKGDTheme.components?.MuiCheckbox?.styleOverrides?.colorPrimary;
      
      expect(primaryOverrides).toMatchObject({
        color: expect.any(String), // white
        '&.Mui-checked:not(.Mui-disabled)': {
          color: expect.any(String) // white
        }
      });
    });

    test('should verify colorSecondary style overrides structure', () => {
      const secondaryOverrides = darkBKGDTheme.components?.MuiCheckbox?.styleOverrides?.colorSecondary;
      
      expect(secondaryOverrides).toMatchObject({
        color: expect.any(String), // greenColor
        '&.Mui-checked:not(.Mui-disabled)': {
          color: expect.any(String) // greenColor
        }
      });
    });
  });
});

// Snapshot tests
describe('Checkbox Theme Snapshot', () => {
  test('Checkbox theme overrides match expected structure', () => {
    expect(darkBKGDTheme.components?.MuiCheckbox).toMatchSnapshot();
  });

  test('Checkbox root styles snapshot', () => {
    const rootStyles = darkBKGDTheme.components?.MuiCheckbox?.styleOverrides?.root;
    expect(rootStyles).toMatchSnapshot();
  });
});

// Integration tests for different states
describe('Checkbox States Integration', () => {
  test('all checkbox variants render correctly', () => {
    renderWithTheme(<CheckboxTestComponent />);
    
    const checkboxes = [
      'default-checkbox',
      'checked-checkbox',
      'disabled-checkbox',
      'disabled-checked-checkbox',
      'primary-checkbox',
      'primary-checked-checkbox',
      'secondary-checkbox',
      'secondary-checked-checkbox',
      'disabled-primary-checkbox'
    ];
    
    checkboxes.forEach(testId => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });

  test('checkbox states have correct classes', () => {
    renderWithTheme(<CheckboxTestComponent />);
    
    const checkedCheckbox = screen.getByTestId('checked-checkbox');
    expect(checkedCheckbox).toHaveClass('Mui-checked');
    
    const disabledCheckbox = screen.getByTestId('disabled-checkbox');
    expect(disabledCheckbox).toHaveClass('Mui-disabled');
    
    const disabledCheckedCheckbox = screen.getByTestId('disabled-checked-checkbox');
    expect(disabledCheckedCheckbox).toHaveClass('Mui-checked');
    expect(disabledCheckedCheckbox).toHaveClass('Mui-disabled');
  });
});

// Test for color consistency
describe('Checkbox Color Consistency', () => {
  test('primary color checkboxes maintain white color in both states', () => {
    renderWithTheme(<CheckboxTestComponent />);
    
    const primaryCheckbox = screen.getByTestId('primary-checkbox');
    const primaryCheckedCheckbox = screen.getByTestId('primary-checked-checkbox');
    
    // Both should have the primary color class
    expect(primaryCheckbox).toBeInTheDocument();
    expect(primaryCheckedCheckbox).toBeInTheDocument();
  });

  test('secondary color checkboxes maintain greenColor in both states', () => {
    renderWithTheme(<CheckboxTestComponent />);
    
    const secondaryCheckbox = screen.getByTestId('secondary-checkbox');
    const secondaryCheckedCheckbox = screen.getByTestId('secondary-checked-checkbox');
    
    expect(secondaryCheckbox).toBeInTheDocument();
    expect(secondaryCheckedCheckbox).toBeInTheDocument();
  });
});
