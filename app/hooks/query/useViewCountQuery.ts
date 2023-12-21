import { useQuery } from '@tanstack/react-query'
import getData from '../../actions/getData'
import { viewCountKeys } from '@/app/constants/queryKey'

export default function useViewCountQuery(postingId: string) {
  const {
    data: viewCount,
    isPending,
    error,
  } = useQuery({
    queryKey: viewCountKeys.viewCount(postingId),
    queryFn: () =>
      getData<number>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/view-count?postingId=${postingId}`,
      ),
  })
  return { viewCount, isPending, error }
}
