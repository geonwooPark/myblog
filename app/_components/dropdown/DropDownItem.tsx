import { Posting } from '@/app/edit/[id]/page'
import React from 'react'

interface DropDownItemProps {
  category: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setPosting: React.Dispatch<React.SetStateAction<Posting>>
}

export default function DropDownItem({
  category,
  setIsOpen,
  setPosting,
}: DropDownItemProps) {
  const onClick = () => {
    setIsOpen(false)
    setPosting((prev) => {
      return { ...prev, category }
    })
  }

  return (
    <li
      className="bg-gray-600 px-4 py-2 border-b border-gray-500 cursor-pointer"
      onClick={onClick}
    >
      {category}
    </li>
  )
}