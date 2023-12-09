'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import Spinner from '../common/Spinner'
import getData from '@/app/_actions/getData'
import { toast } from 'react-toastify'

interface LikeCounterProps {
  postingId: string
}

export default function LikeCounter({ postingId }: LikeCounterProps) {
  const { data, isPending, error } = useQuery({
    queryKey: ['likeCount', { postingId }],
    queryFn: () => getData<number>(`/api/like-count?postingId=${postingId}`),
  })

  if (error) {
    toast.error(error.message)
  }

  return (
    <div className="flex justify-center items-center ml-2">
      <div>
        <AiFillHeart />
      </div>
      <div className="ml-1">
        {isPending ? (
          <Spinner width="w-3" height="w-3" fillColor="fill-blue-600" />
        ) : (
          data
        )}
      </div>
    </div>
  )
}