import React from 'react'
import { render, screen } from '@testing-library/react'
import UniversityListClient from '@/app/universities/UniversityListClient'

const sample = [
  {
    id: 'test1',
    name: 'Test University',
    city: 'Prague',
    fields: ['Engineering'],
    founded: 2000,
    blurb: { en: 'Short blurb' },
  },
]

describe('UniversityListClient', () => {
  it('renders list and search input', () => {
    render(<UniversityListClient initialList={sample as any} initialQ={''} cities={['Prague']} fields={['Engineering']} />)
    expect(screen.getByPlaceholderText('Search by name, city, field...')).toBeInTheDocument()
    expect(screen.getByText('Test University')).toBeInTheDocument()
  })
})
