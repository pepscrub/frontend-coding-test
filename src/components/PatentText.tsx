import { LOCALE } from "@/lib/constants";
import { Abstract } from "@/models/Abstract";
import { Claim } from "@/models/Claim";
import { En } from "@/models/En";
import { PatentDocument } from "@/models/PatentDocument";
import { FC, PropsWithChildren, ReactNode } from "react";
import { useTranslation } from "react-i18next";

const AbstractText: FC<{ abstractInfo?: En[]; startingText?: ReactNode }> = ({ abstractInfo, startingText }) => {
  return <>{abstractInfo?.map(({ text }, i) => <p key={`abstract-paragraph-${i}`} >{i === 0 && startingText}{text}</p>)}</>
}

export const PatentAbstractMatch: FC<{ abstract: Abstract }> = ({ abstract }) => {
  const { t } = useTranslation();
  return (
    <>
      {abstract[LOCALE]
        ? <section>
            <AbstractText abstractInfo={abstract[LOCALE]} startingText={<span className={'font-semibold'}>{t('Abstract match: ')}</span>} />
          </section>
        : <p>{t('No abstract found')}</p>
      }
    </>
  )
}

export const PatentPreview: FC<{ patent: PatentDocument } & PropsWithChildren> = ({ patent, children }) => {
  const abstract = patent.abstract?.[patent.abstract_lang?.find((lng) => lng === LOCALE) ??LOCALE]
  const claimInfo = patent.claim[(patent.claim_lang?.find((lng) => lng === LOCALE) ?? LOCALE) as keyof Claim]?.map(({ text }) => text);
  return (
    <article className={'basis-6/12 border-r border-neutral-300 p-5'}>
      {abstract && <>
        <h1 className={'font-bold'}>Abstract</h1>
        <AbstractText abstractInfo={abstract} />
      </>}
      {claimInfo && <>
        <h1 className={'font-bold mt-2'}>Claim</h1>
        {claimInfo?.map((text, i) => <section key={`claim-item-${i}`} className={`pb-4 ${i === 0 ? 'pt-4' : ''}`}>{text}</section>)}
      </>}
      {children}
    </article>
  );
}