import Section from '../components/common/Section'
import HeroSection from '../components/heroSection/HeroSection'
import Article from '../components/_blog/article/Article'
import PopularListing from '../components/_blog/popularListing/PopularListing'
import getAllListing from '../actions/getAllListing'
import getAllListingCount from '../actions/getAllListingCount'
import CategoryMenu from '../components/_blog/sidebar/CategoryMenu'

export const revalidate = 1800

const PAGE = 1
const LIMIT = 5

export default async function Home() {
  const listing = await getAllListing({
    page: PAGE,
    limit: LIMIT,
  })
  const listingCount = await getAllListingCount()

  return (
    <main>
      <HeroSection
        title="Study Log"
        description="프로젝트 경험을 통해 얻은 정보나 지식을 공유하기 위한 개인 블로그"
      />

      <Section label="인기 게시글">
        <PopularListing />
      </Section>

      <Section>
        <div className="flex flex-col md:flex-row-reverse">
          <CategoryMenu />
          <Article
            title="전체 게시글"
            path="postings"
            page={PAGE}
            limit={LIMIT}
            listing={listing}
            listingCount={listingCount}
          />
        </div>
      </Section>
    </main>
  )
}