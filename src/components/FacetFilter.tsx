import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ModifiedBucket, useFilter } from './FacetFilterController'
import { Flag } from './Flag'
import { Button } from './ui/Button'

export function FacetFilter() {
  const { t } = useTranslation();
  const { searchResults } = useFilter();
  return (
    <div className={'p-2'}>
      {searchResults.map((bucket,i) => <FacetFilterItem key={`${bucket.key}-${i}`} bucket={bucket} />)}
      <div className="flex py-2">
        <Button size="sm">{t('Refine')}</Button>
      </div>
    </div>
  )
}

export function FacetFilterItem({ bucket }: { bucket: ModifiedBucket }) {
  const [checked, setChecked] = useState(bucket.checked);
  const { updateSelected } = useFilter();
  const { t } = useTranslation();
  const keyAsDate = new Date(bucket.original_key);
  const isDate = !isNaN(keyAsDate.getDate());

  const label = isDate ? bucket?.key_as_string : t(bucket.key.replace('_', ' '));

  // Disabled exhaustive deps due to infinite re-mounting
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateSelected(bucket, checked), [checked]);
  useEffect(() => setChecked(bucket.checked), [bucket]);

  return (
    <label
      className="flex items-center text-sm small cursor-pointer py-1 hover:bg-slate-100 dark:hover:bg-slate-900"
      key={bucket.key}
    >
      <span className="mr-1">
        <input type="checkbox" checked={bucket.checked} onChange={() => setChecked(!checked)} />
      </span>
      <Flag countryCode={bucket.original_key} />
      <span className="flex-1">{label}</span>
      <span className="justify-self-end">({bucket.doc_count})</span>
    </label>
  )
}
