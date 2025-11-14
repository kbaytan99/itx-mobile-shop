import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

// test basic route renders list page loading state

describe('Routing', () => {
  it('renders product list route', async () => {
    render(<App />);
    // initial state shows loading
    expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
  });
});
