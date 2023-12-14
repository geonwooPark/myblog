import React from 'react'
import getChunk from '../../../../utils/getChunk'
import PrevPageButton from './PrevPageButton'
import NextPageButton from './NextPageButton'
import PageNumber from './PageNumber'

interface PaginationProps {
  path: string
  listingCount: number
  page: number
  limit: number
  category?: string
  search?: string
}

export default function Pagenation({
  listingCount,
  limit,
  ...props
}: PaginationProps) {
  const { page } = props
  const lastPageNum = Math.ceil(listingCount / limit)
  const numbering = Array.from({ length: lastPageNum }, (_, i) => (
    <PageNumber key={i} index={i} {...props} />
  ))

  const THE_NUMBER = 3
  const boundNumbering = getChunk(numbering, THE_NUMBER)
  const sequence = Math.floor((page - 1) / THE_NUMBER)

  return (
    <div className="flex items-center gap-2 text-sm">
      <PrevPageButton {...props} />
      {boundNumbering[sequence]}
      <NextPageButton {...props} lastPageNum={lastPageNum} />
    </div>
  )
}