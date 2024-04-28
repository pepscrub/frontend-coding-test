import { ANCHOR_STYLING } from "@/lib/constants";
import { PatentDocument } from "@/models/PatentDocument";
import { toTitleCase } from "@/utils";
import { FC, Fragment } from "react";

export const CitedInfo: FC<{ patent: PatentDocument }> = ({ patent }) => {
  const displayData = {
    cited_by: patent.cited_by.patent_count,
    cites_npl: patent['reference_cited.npl_resolved_count'],
    reference_count: patent['reference_cited.patent_count']
  };
  return (
    <div>
      {Object.entries(displayData).map(([key, value], i) => (
        <Fragment key={`${key}-${i}`}>{!!value && <a href='#' className={ANCHOR_STYLING + ' mr-5'}>{toTitleCase(key)}: {value}</a>}</Fragment>
      ))}
    </div>
  );
}