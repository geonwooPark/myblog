'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function CategoryItem({ category }: { category: string }) {
  const search = useSearchParams().get('search')
  return (
    <div>
      <Link href={{ pathname: `/categories`, query: { search: category } }}>
        <button
          className={`px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-sm transition hover:opacity-50
        ${search === category ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
        >
          {category}
        </button>
      </Link>
    </div>
  )
}