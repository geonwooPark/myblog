import React, { Suspense } from 'react'
import NewArrivals from './components/_home/NewArrivals/NewArrivals'
import Weather from './components/_home/Weather/Weather'
import MyCheckList from './components/_home/MyCheckList/MyCheckList'
import LoadingUI from './components/_home/LoadingUI'
import ErrorUI from './components/_home/ErrorUI'
import { ErrorBoundary } from 'react-error-boundary'
import Container from './components/common/Container'
import MenAnimation from './components/common/Animation/MenAnimation'

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <main className="h-auto w-full md:h-full">
      <section className="h-full pb-5 pt-[82px] text-white md:py-[102px] md:pb-[82px]">
        <Container className="h-full">
          <div className="flex h-full items-center justify-center">
            <div className="h-full w-full max-w-[580px] rounded-md md:max-h-[504px]">
              <div className="mb-5 flex w-full flex-col items-center justify-center gap-5 md:flex-row">
                <article className="h-[300px] w-full rounded-md bg-slate-700 px-4 py-3 md:max-w-[280px]">
                  <ErrorBoundary FallbackComponent={ErrorUI}>
                    <Suspense fallback={<LoadingUI />}>
                      <Weather />
                    </Suspense>
                  </ErrorBoundary>
                </article>
                <article className="h-[300px] w-full rounded-md bg-slate-700 px-4 py-3 md:max-w-[280px]">
                  <ErrorBoundary FallbackComponent={ErrorUI}>
                    <Suspense fallback={<LoadingUI />}>
                      <MyCheckList />
                    </Suspense>
                  </ErrorBoundary>
                </article>
              </div>
              <article className="mx-auto h-[184px] w-full max-w-[580px] rounded-md bg-slate-700 px-4 py-3">
                <ErrorBoundary FallbackComponent={ErrorUI}>
                  <Suspense fallback={<LoadingUI />}>
                    <NewArrivals />
                  </Suspense>
                </ErrorBoundary>
              </article>
            </div>
          </div>
        </Container>
      </section>
      <MenAnimation />
    </main>
  )
}
