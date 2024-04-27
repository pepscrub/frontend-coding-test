import { PatentDocument } from "@/models/PatentDocument";
import { toTitleCase } from "@/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const ApplicantAndInventorInfo: FC<{patent: PatentDocument}> = ({ patent }) => {
  const { t } = useTranslation();
  const applicants = patent.applicant
      .filter(({ app_type }) => app_type === 'applicant')
      .map(({ name }) => toTitleCase(name))

  const inventors = patent.inventor.map(({ name }) => toTitleCase(name))
  return <>
    <div className={'capitalize'}>{t('Applicant', { count: applicants.length })}: {applicants.join(', ')}</div>
    <div className={'capitalize'}>{t('Inventor', { count: inventors.length} )}: {inventors.join(', ')}</div>
  </>
}