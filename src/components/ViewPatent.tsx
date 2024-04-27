import { PatentDocument } from '@/models/PatentDocument';
import { PatentEmojis } from '@/models/PatentLegalStatus';
import { toTitleCase } from '@/utils';
import { FC } from 'react';
import { ReactCountryFlag } from 'react-country-flag';


interface Props {
  patent: PatentDocument;
}

const PatentBar: FC<Props> = ({ patent }) => {
  const { jurisdiction, doc_number, kind, publication_type, priority_claim, family } = patent;
  // Removes duplicate jurisdictions from array
  const jurisdictions = Array.from(new Set(priority_claim.map(({ jurisdiction }) => jurisdiction)));
  // Ideally this would be a translation
  const titleCasedPublication = toTitleCase(publication_type);
  return (
    <div className={'flex'}>
      <div className={'mr-5 flex items-center'}>
        <ReactCountryFlag countryCode={jurisdiction} svg />
        <span className={'mx-0.5 ml-1'}>{doc_number}</span>
        <span className={'mx-0.5'}>{kind}</span>
      </div>
      <div className={'mr-5'}>
        <span className={'font-semibold'}>{titleCasedPublication}</span>
      </div>
      {/* Figure out what the family length means? */}
      <div className={'mr-5'}>
        Family: {family.simple.size}
      </div>
      <div className={'mr-5'}>
        <span>Family Jurisdictions:</span>
        <span className={'px-1'}>{jurisdictions.join(',')}</span>
      </div>
    </div>
  )
}

const PatentInfo: FC<Props> = ({ patent }) => {
  const { legal_status: legal } = patent;
  const legalStatus = legal.patent_status;
  return (
    <div>
      <PatentBar patent={patent} />
      <div>
        Legal Status: <abbr title={legal.ipr_type}>{PatentEmojis[legalStatus]} {toTitleCase(legalStatus)}</abbr>
      </div>
    </div>
  )
}


export function ViewPatent({ patent }: { patent: PatentDocument }) {
  // const { t } = useTranslation()
  return (
    <div className={'container mx-auto py-5'}>
      <h1 className={'text-xl mb-2'}>{patent.title?.en?.at(0)?.text || ''}</h1>
      <PatentInfo patent={patent} />
      {/* <div>{patent.doc_key}</div>
      <p className={'capitalize py-2'}>{patent.publication_type}</p>
      <div className={'py-2'}>
        <PatentPills doc={patent} />
      </div>
      <div>
        {t('Published: ')} {patent.date_published || patent.year_published || 'unknown'}
      </div>
      <div>
        {t('Jurisdiction: ')} {patent.jurisdiction}
      </div>
      <div>
        {t('Applicants: ')}{' '}
        {patent.applicant.map((applicant) => (
          <small key={applicant.name}>{applicant.name} </small>
        ))}
      </div>
      <div>
        {t('Inventors: ')}
        {patent.inventor.map((inventor) => (
          <small key={inventor.name}>{inventor.name} </small>
        ))}
      </div> */}
      <pre className={'py-2'}>{JSON.stringify(patent, null, 2)}</pre>
    </div>
  )
}
