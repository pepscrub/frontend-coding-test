import { Bucket } from '@/models/Bucket'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TermsAggregation } from '../models/TermsAggregation'
import { useFilter } from './FacetFilterGroup'
import { Button } from './ui/Button'

export interface FacetFilterGroupProps {
  aggregation: TermsAggregation
  label: string
}

export function FacetFilter({ aggregation }: { aggregation: TermsAggregation }) {
  const { t } = useTranslation();
  const { updateFiltered } = useFilter();
  return (
    <div className={'p-2'}>
      {aggregation?.buckets?.map((bucket,i) => {
        return <FacetFilterItem key={`${bucket.key}-${i}`} bucket={bucket} />
      })}
      <div className="flex py-2">
        <Button size="sm" onClick={updateFiltered}>{t('Refine')}</Button>
      </div>
    </div>
  )
}

export function FacetFilterItem({ bucket }: { bucket: Bucket }) {
  const [checked, setChecked] = useState(false);
  const { updateSelected } = useFilter();

  // Disabled exhaustive deps due to infinite re-mounting on functions
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateSelected(bucket, checked), [bucket, checked]);

  return (
    <label
      className="flex text-sm small cursor-pointer py-1 hover:bg-slate-100 dark:hover:bg-slate-900"
      key={bucket.key}
    >
      <span className="mr-1">
        <input type="checkbox" checked={checked} onChange={() => setChecked((check) => !check)} />
      </span>
      <span className="flex-1">{bucket.key.replace('_', ' ')}</span>
      <span className="justify-self-end">({bucket.doc_count.toLocaleString()})</span>
    </label>
  )
}
