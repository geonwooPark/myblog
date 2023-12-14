import React from 'react'
import NewArrivals from './components/_home/NewArrivals/NewArrivals'
import Weather from './components/_home/Weather/Weather'
import MyCheckList from './components/_home/MyCheckList/MyCheckList'

export const revalidate = 1800

export default function Home() {
  return (
    <div className="flex h-auto min-h-full items-center py-[82px] md:py-[102px]">
      <div className="my-container text-white">
        <div className="mb-5 flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <div className="h-[300px] w-full rounded-xl bg-slate-700 px-4 py-3 md:max-w-[280px]">
            <Weather />
          </div>
          <div className="h-[300px] w-full rounded-xl bg-slate-700 px-4 py-3 md:max-w-[280px]">
            <MyCheckList />
          </div>
        </div>
        <div className="mx-auto w-full max-w-[580px] rounded-xl bg-slate-700 px-4 py-3">
          <NewArrivals />
        </div>
      </div>
    </div>
  )
}
