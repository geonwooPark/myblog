import Section from '@/app/components/common/Section'
import Article from '@/app/components/_blog/common/Article/Article'
import getAllListingCount from '@/app/actions/getAllListingCount'
import CategoryMenu from '@/app/components/_blog/common/Sidebar/CategoryMenu'
import HeroSection from '@/app/components/common/HeroSection'
import AllListing from '@/app/components/_blog/_posting/AllListing'
import { LIMIT } from '@/app/constants'

export const revalidate = 1800

interface IParams {
  params: {
    page: string
  }
}

export async function generateStaticParams() {
  const listingCount = await getAllListingCount()
  const lastPageNum = Math.ceil(listingCount / LIMIT)

  return Array.from({ length: lastPageNum - 1 }).map((_, i) => ({
    page: (i + 2).toString(),
  }))
}

export default async function Postings({ params }: IParams) {
  const { page } = params

  return (
    <main>
      <HeroSection
        title="Study Log"
        description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
      />

      <Section>
        <div className="flex flex-col md:flex-row-reverse">
          <CategoryMenu />
          <Article title="전체 게시글">
            <AllListing path="postings" page={Number(page)} limit={LIMIT} />
          </Article>
        </div>
      </Section>
    </main>
  )
}
