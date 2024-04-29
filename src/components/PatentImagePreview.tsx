import { FC, PropsWithChildren } from "react"

// TODO: Extend functionality once document previewing is complete
export const PatentImagePreview: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={'basis-3/12 p-5'}>
      <h1 className={'font-bold'}>Document Preview</h1>
      <div className={'w-full, h-80 bg-white text-black text-center p-3 pt-5'}> <span className={'text-red-600'}>🛈</span> No Image Yet</div>
      {children}
    </div>
  )
}