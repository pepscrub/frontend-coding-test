import { ANCHOR_STYLING } from '@/lib/constants';
import { PatentDocument } from '@/models/PatentDocument';
import { PatentEmojis } from '@/models/PatentLegalStatus';
import { convertToHumanDate, toTitleCase } from '@/utils';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PatentBar } from './PatentBar';
import { CitedInfo } from './PatentCited';
import { PatentPills } from './PatentPills';


interface Props {
  patent: PatentDocument;
}

const PatentInfo: FC<Props> = ({ patent }) => {
  const { t } = useTranslation()
  const {
    legal_status: legal,
    doc_number,
    date_published,
    earliest_priority_claim_date,
  } = patent;
  // Add other dates once found out what they are (filed, granted, etc)
  const displayDates = {
    published: date_published,
    earliest_priority: earliest_priority_claim_date,
  }
  const applicants = patent.applicant
      .filter(({ app_type }) => app_type === 'applicant')
      .map(({ name }) => toTitleCase(name))

  const inventors = patent.inventor.map(({ name }) => toTitleCase(name))
  const legalStatus = legal.patent_status;

  return (
    <div>
      <PatentBar patent={patent} />
      <div>
        Legal Status: <a href='#' className={ANCHOR_STYLING}>{PatentEmojis[legalStatus]} {toTitleCase(legalStatus)}</a>
      </div>
      <div>
        <span className={'mr-2'}>{t('Application No:')} {doc_number}</span>
        {Object.entries(displayDates).map(([key, value]) => (
          <span className={'mr-2'}>{t(`${toTitleCase(key)}:`)} {convertToHumanDate(value)}</span>
        ))}
      </div>
      {/* Need to make key for translation to append plurals */}
      <div className={'capitalize'}>{t('Applicant', { count: applicants.length })}: {applicants.join(', ')}</div>
      <div className={'capitalize'}>{t('Inventor', { count: inventors.length} )}: {inventors.join(', ')}</div>
      <CitedInfo patent={patent} />
      <span>{t('Additional Info: ')}</span><PatentPills doc={patent} />
    </div>
  )
}


export function ViewPatent({ patent }: { patent: PatentDocument }) {
  // const { t } = useTranslation()
  return (
    <div className={'container mx-auto py-5'}>
      <h1 className={'text-xl mb-2'}>{patent.title?.en?.at(0)?.text || ''}</h1>
      <PatentInfo patent={patent} />
      <pre className={'py-2'}>{JSON.stringify(patent, null, 2)}</pre>
    </div>
  )
}
