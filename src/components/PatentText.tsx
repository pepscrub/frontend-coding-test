import { Abstract } from "@/models/Abstract";
import { Claim } from "@/models/Claim";
import { En } from "@/models/En";
import { PatentDocument } from "@/models/PatentDocument";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

const locale = new Intl.Locale(navigator.language).language as keyof Abstract;

const AbstractText: FC<{ abstractInfo?: En[]; startingText?: ReactNode }> = ({ abstractInfo, startingText }) => {
  return <>{abstractInfo?.map(({ text }, i) => <p>{i === 0 && startingText}{text}</p>)}</>
}

export const PatentAbstract: FC<{ abstract: Abstract }> = ({ abstract }) => {
  const { t } = useTranslation();
  return (
    <>
      {abstract[locale]
        ? <section>
            <AbstractText abstractInfo={abstract[locale]} startingText={<span className={'font-semibold'}>{t('Abstract match: ')}</span>} />
          </section>
        : <p>{t('No abstract found')}</p>
      }
    </>
  )
}

export const PatentPreview: FC<{ patent: PatentDocument }> = ({ patent }) => {
  const abstract = patent.abstract?.[locale]
  const claimInfo = patent.claim[locale as keyof Claim]?.map(({ text }) => text);
  return <article className={'basis-6/12 border-r border-neutral-300 p-5'}>
    {abstract && <>
      <h1 className={'font-bold'}>Abstract</h1>
      <AbstractText abstractInfo={abstract} />
      <h1 className={'font-bold mt-2'}>Claim</h1>
      {claimInfo?.map((text, i) => <section className={`pb-4 ${i === 0 ? 'pt-4' : ''}`}>{text}</section>)}
    </>}
  </article>;
}