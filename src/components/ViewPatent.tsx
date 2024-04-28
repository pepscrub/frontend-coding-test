import { ANCHOR_STYLING, LOCALE } from '@/lib/constants';
import { PatentDocument } from '@/models/PatentDocument';
import { patentLegalColors } from '@/theme';
import { convertToHumanDate, toTitleCase } from '@/utils';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ApplicantAndInventorInfo } from './PatentApplicantInventor';
import { PatentBar } from './PatentBar';
import { CitedInfo } from './PatentCited';
import { PatentImagePreview } from './PatentImagePreview';
import { PatentPills } from './PatentPills';
import { PatentPreview } from './PatentText';

const PatentInfo: FC<{patent: PatentDocument}> = ({ patent }) => {
  const { t } = useTranslation()
  const {
    legal_status: legal,
    doc_number,
    date_published,
    earliest_priority_claim_date,
  } = patent;

  // TODO: Extend to include dates not in demo JSON
  const displayDates = {
    published: date_published,
    earliest_priority: earliest_priority_claim_date,
  }

  const legalStatus = legal.patent_status;

  return (
    <div className={'mb-10 text-gray-400'}>
      <PatentBar patent={patent} />
      <div className={'flex'}>
        {t('Legal Status')}:
        <a href='#' className={`${ANCHOR_STYLING} flex items-center`}>
          <span
            className={'inline-block w-4 h-4 bg-gray-500 rounded-full mx-0.5'}
            style={{ backgroundColor: patentLegalColors[legalStatus] }}
          />
          {t(`legal.status.${legalStatus}`)}
        </a>
      </div>
      <div>
        <span className={'mr-2'}>{t('applicant_no', { count: parseInt(doc_number) })}</span>
        {Object.entries(displayDates).map(([key, value], i) => (
          <span key={`patent-dates-${i}`} className={'mr-2'}>
            {t(`${toTitleCase(key)}`)}: {convertToHumanDate(value)}
          </span>
        ))}
      </div>
      <ApplicantAndInventorInfo patent={patent} />
      <CitedInfo patent={patent} />
      <div className={'mb-3'}>{t('Additional Info: ')}<PatentPills doc={patent} /></div>
    </div>
  )
}


export function ViewPatent({ patent }: { patent: PatentDocument }) {
  return (
    <div className={'container mx-auto py-5'}>
      <h1 className={'text-xl mb-2'}>{patent.title?.[LOCALE]?.at(0)?.text || ''}</h1>
      <PatentInfo patent={patent} />
      <div className='flex flex-column border-t border-neutral-300'>
        <PatentPreview patent={patent} />
        <PatentImagePreview />
      </div>
    </div>
  )
}
