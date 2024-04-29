import { LOCALE } from "@/lib/constants";
import { Abstract } from "@/models/Abstract";
import { Claim } from "@/models/Claim";
import { En } from "@/models/En";
import { PatentDocument } from "@/models/PatentDocument";
import { FC, PropsWithChildren, ReactNode, useEffect, useState } from "react";
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

const ClaimInfo: FC<{ claimInfo: string[] }> = ({ claimInfo }) => {
  const [readMore, setReadMore] = useState(false);
  const [index, setIndex] = useState(0);
  const [claim, setClaim] = useState(claimInfo);
  const maxCharLength = 1024;

  useEffect(() => {
    if(readMore) return setClaim(claimInfo);
    let charLength = 0
    const updatedReadMore = claimInfo
      .map((paragraph, i) => {
        charLength += paragraph.length
        if (charLength < maxCharLength || i === 0) setIndex(i + 1)
        return paragraph;
      })
      .splice(0, index)
    setClaim(updatedReadMore);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimInfo, index, readMore])

  return (
    <>
      <h1 className={'font-bold mt-2'}>Claim</h1>
      {claim.map((text, i) => <section key={`claim-item-${i}`} className={`pb-4 ${i === 0 ? 'pt-4' : ''}`}>{text}</section>)}
      <button className={'font-medium'} onClick={() => setReadMore((readMore) => !readMore)}>{readMore ? 'Read Less...' : 'Read More...'}</button>
    </>
  )
}

export const PatentPreview: FC<{ patent: PatentDocument } & PropsWithChildren> = ({ patent, children }) => {
  const abstract = patent.abstract?.[patent.abstract_lang?.find((lng) => lng === LOCALE) ??LOCALE]
  const claimInfo = patent.claim[(patent.claim_lang?.find((lng) => lng === LOCALE) ?? LOCALE) as keyof Claim]?.map(({ text }) => text);
  return (
    <article className={'basis-9/12 border-r border-neutral-300 p-5'}>
      {abstract && <>
        <h1 className={'font-bold'}>Abstract</h1>
        <AbstractText abstractInfo={abstract} />
      </>}
      {claimInfo && <>
        <ClaimInfo claimInfo={claimInfo} />
      </>}
      {children}
    </article>
  );
}