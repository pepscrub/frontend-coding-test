import { ANCHOR_STYLING } from "@/lib/constants";
import { PatentDocument } from "@/models/PatentDocument";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";

export const CitedInfo: FC<{ patent: PatentDocument }> = ({ patent }) => {
  const { t } = useTranslation();
  
  const displayData = {
    cited_works: patent["reference_cited.patent_count"], 
    cited_by: patent.cited_by.patent_count,
    cites_npl: patent['reference_cited.npl_resolved_count'],
  };

  return (
    <div>
      {Object.entries(displayData).map(([key, value], i) => (
        <Fragment key={`${key}-${i}`}>{<a href='#' className={ANCHOR_STYLING + ' mr-5'}>{t(key)}: {value}</a>}</Fragment>
      ))}
    </div>
  );
}