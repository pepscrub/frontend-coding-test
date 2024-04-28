import { ANCHOR_STYLING } from '@/lib/constants';
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
import { PatentAbstract, PatentPreview, } from './PatentText';

const PatentInfo: FC<{patent: PatentDocument}> = ({ patent }) => {
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
  const legalStatus = legal.patent_status;
  return (
    <div className={'mb-10'}>
      <PatentBar patent={patent} />
      <div className={'flex'}>
        Legal Status:
        <a href='#' className={`${ANCHOR_STYLING} flex items-center`}>
          <span
            className={'inline-block w-4 h-4 bg-gray-500 rounded-full mx-0.5'}
            style={{ backgroundColor: patentLegalColors[legalStatus] }}
          />
          {toTitleCase(legalStatus)}
        </a>
      </div>
      <div>
        <span className={'mr-2'}>{t('Application No:')} {doc_number}</span>
        {Object.entries(displayDates).map(([key, value]) => (
          <span className={'mr-2'}>{t(`${toTitleCase(key)}:`)} {convertToHumanDate(value)}</span>
        ))}
      </div>
      {/* Need to make key for translation to append plurals */}
      <ApplicantAndInventorInfo patent={patent} />
      <CitedInfo patent={patent} />
      <div className={'mb-3'}>{t('Additional Info: ')}<PatentPills doc={patent} /></div>
      <PatentAbstract abstract={patent.abstract} />
      {/* Extend for additional information like description once defined */}
    </div>
  )
}


export function ViewPatent({ patent }: { patent: PatentDocument }) {
  return (
    <div className={'container mx-auto py-5'}>
      <h1 className={'text-xl mb-2'}>{patent.title?.en?.at(0)?.text || ''}</h1>
      <PatentInfo patent={patent} />
      <div className='flex flex-column border-t border-neutral-300'>
        <PatentPreview patent={patent} />
        <PatentImagePreview />
      </div>
    </div>
  )
}
