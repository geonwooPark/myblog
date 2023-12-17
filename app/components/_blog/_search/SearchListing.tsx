import getSearchListing from '@/app/actions/getSearchListing'
import React from 'react'
import Pagination from '../common/Pagination/Pagination'
import EmptyState from '../../common/EmptyState'
import ListingItem from '../common/Listing/ListingItem'

interface SearchListingProps {
  path: 'search'
  page: number
  limit: number
  search: string
}

export default async function SearchListing({ ...props }: SearchListingProps) {
  const { page, limit, search } = props
  const { listing, listingCount } = await getSearchListing({
    page,
    limit,
    search,
  })

  if (listingCount === 0) {
    return (
      <div className="h-full">
        <EmptyState label="작성된 게시글이 없어요!" />
      </div>
    )
  }

  return (
    <div>
      <ul>
        {listing?.map((listingItem) => {
          return <ListingItem key={listingItem._id} posting={listingItem} />
        })}
      </ul>
      <Pagination {...props} listingCount={listingCount} />
    </div>
  )
}