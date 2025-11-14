import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

// simple smoke test: app renders header

describe('App', () => {
  it('renders header title', () => {
    render(<App />);
    expect(screen.getByText(/ITX Mobile Shop/i)).toBeInTheDocument();
  });
});
