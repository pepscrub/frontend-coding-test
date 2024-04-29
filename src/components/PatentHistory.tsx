import { PatentDocument } from "@/models/PatentDocument";
import { PriorityClaim } from "@/models/PriorityClaim";
import { convertToHumanDate } from "@/utils";
import { FC } from "react";
import ReactCountryFlag from "react-country-flag";

interface Props {
  patent: PatentDocument;
}

interface HistoryEntry extends PriorityClaim {
  label: string;
}

const HistoryItem: FC<{ item: HistoryEntry }> = ({
  item
}) => (
  <div className={'mt-3'}>
    <div>
      <span>{item.label}:</span>
      <span className={'ml-2'}>{convertToHumanDate(item.date)}</span>
    </div>
    <div className={'text-gray-500'}>
      <ReactCountryFlag countryCode={item.jurisdiction} svg />
      <span className="mx-0.5 ml-1">{item.jurisdiction}</span>
      <span className="mx-0.5">{item.doc_number}</span>
      <span className="mx-0.5">{item.kind}</span>
    </div>
  </div>
)

const HistoryItems: FC<{ items: HistoryEntry[] }> = ({
  items
}) => (
  <div className={"grid grid-cols-1 divide-y "}>
    {items
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((item) => <HistoryItem item={item} />)}
  </div>
)

export const PatentHistory: FC<Props> = ({ patent }) => {
  const { doc_number, jurisdiction, kind } = patent
  const applicantPatent = { jurisdiction, doc_number, kind}

  const historyItems: HistoryEntry[] = [
    {...applicantPatent, date: new Date(patent.date_published), label: 'Publication' },
    {...applicantPatent, date: new Date(patent.application_reference.date), label: 'Application' },
    ...patent.priority_claim.map((claim) => ({ ...claim, label: 'Priority' }))
  ]

  return <>
    <HistoryItems items={historyItems} />
  </>;
}
