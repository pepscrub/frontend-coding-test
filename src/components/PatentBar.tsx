import { PatentDocument } from "@/models/PatentDocument";
import { removeDuplicates } from "@/utils";
import { FC } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

export const PatentBar: FC<{ patent: PatentDocument }> = ({ patent }) => {
  const { t } = useTranslation();
  const { jurisdiction, doc_number, kind, publication_type, priority_claim, family } = patent;
  const jurisdictions = removeDuplicates(priority_claim.map(({ jurisdiction }) => jurisdiction));
  // Ideally this would be a translation
  return (
    <div className={'flex flex-wrap'}>
      <div className={'mr-3 flex items-center'}>
        <ReactCountryFlag countryCode={jurisdiction} svg />
        <span className={'mx-0.5 ml-1'}>{doc_number}</span>
        <span className={'mx-0.5'}>{kind}</span>
      </div>
      <div className={'mr-3'}>
        <span className={'font-semibold capitalize'}>{t(`publication.${publication_type.toLocaleLowerCase()}.title`)}</span>
      </div>
      {/* Figure out what the family length means? */}
      <div className={'mr-3'}>
        {t('family', { simple: family.simple.size, extended: family.simple.size })}
      </div>
      <div className={'mr-3'}>
        <span>Family Jurisdictions:</span>
        <span className={'px-1'}>{jurisdictions.join(',')}</span>
      </div>
    </div>
  )
}