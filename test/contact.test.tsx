import React from 'react'
import { render, screen } from '@testing-library/react'
import ContactPage from '@/app/contact/page'

describe('Contact page', () => {
  it('renders contact methods', () => {
    render(<ContactPage />)
    expect(screen.getByText(/Contact us/i)).toBeInTheDocument()
    expect(screen.getByText(/Email/i)).toBeInTheDocument()
  })
})
