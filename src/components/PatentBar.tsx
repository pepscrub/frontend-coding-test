import { PatentDocument } from "@/models/PatentDocument";
import { removeDuplicates, toTitleCase } from "@/utils";
import { FC } from "react";
import ReactCountryFlag from "react-country-flag";

export const PatentBar: FC<{ patent: PatentDocument }> = ({ patent }) => {
  const { jurisdiction, doc_number, kind, publication_type, priority_claim, family } = patent;
  const jurisdictions = removeDuplicates(priority_claim.map(({ jurisdiction }) => jurisdiction));
  // Ideally this would be a translation
  const titleCasedPublication = toTitleCase(publication_type);
  return (
    <div className={'flex flex-wrap'}>
      <div className={'mr-5 flex items-center'}>
        <ReactCountryFlag countryCode={jurisdiction} svg />
        <span className={'mx-0.5 ml-1'}>{doc_number}</span>
        <span className={'mx-0.5'}>{kind}</span>
      </div>
      <div className={'mr-5'}>
        <span className={'font-semibold capitalize'}>{titleCasedPublication}</span>
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