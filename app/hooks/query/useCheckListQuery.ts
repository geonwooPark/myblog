import { useQuery } from '@tanstack/react-query'
import getData from '../../actions/getData'
import { CheckListItemType } from '../../interfaces/interface'

export default function useCheckListQuery(date: string) {
  const { data: checkList, isPending } = useQuery({
    queryKey: ['checklist', { date }],
    queryFn: () =>
      getData<CheckListItemType[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/check-list?date=${date}`,
      ),
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 3, // 3분
    retry: 0,
    throwOnError: true,
  })

  checkList?.sort((a, b) => {
    return Number(a.status) - Number(b.status)
  })

  return { checkList, isPending }
}
