import { Aggregation } from '@/models/Aggregation';
import { TermsAggregation } from '@/models/TermsAggregation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { FacetFilter } from './FacetFilter';
import { FilterProvider, SELECTION_TYPE, useFilter } from './FacetFilterController';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface StoryBookFacetFilterGroupProps extends Omit<FacetFilterGroupProps, 'aggregation'> {
  aggregationTarget: string;
  aggregation: Record<string, Aggregation>;
}

export interface FacetFilterGroupProps {
  aggregation: TermsAggregation
  label: string
  search?: boolean;
  searchText?: string;
}

const RadioButton: FC<{ selectionType: SELECTION_TYPE; label: string }> = ({ selectionType: selection, label }) => {
  const { selectionType, setSelectionType } = useFilter();
  return (
    <>
      <Input className={'mr-2'} checked={selectionType === selection} onChange={() => setSelectionType(selection)} type="radio" style={{ width: '1rem' }} />
      <label className={'mr-3'}>{label}</label>
    </>
  )
}

export function FacetFilterGroupModel({ label, search: searchEnabled, searchText = 'Search' }: FacetFilterGroupProps) {
  const [show, setShow] = useState(true);
  const { search, setSearch, updateAllBuckets, searchList } = useFilter();
  const allChecked = !searchList.every(({ checked }) => checked);
  // TODO: useScholar with aggregation enabled:show
  return (
    <div className="ml-2 border">
      {searchEnabled 
      && <Input
        className={'mb-2'}
        type="search"
        onKeyUp={(e) => setSearch(e.currentTarget.value)}
        placeholder={`${searchText} ${label}`}
      />
      }
      <div className={'flex justify-between'}>
        <div className={'flex items-center'}>
          {!!search.trim().length
            && <>
              <RadioButton selectionType={SELECTION_TYPE.current} label="Select Current Results" />
              <RadioButton selectionType={SELECTION_TYPE.all} label="All Documents" />
            </>
          }
        </div>
        <Button onClick={() => updateAllBuckets(allChecked)}>{ allChecked ? 'Select' : 'Deselect'} All</Button>
      </div>
      <div className={'font-bold p-2 cursor-pointer'} onClick={() => setShow(!show)}>
        {label}
      </div>
      {show && <FacetFilter />}
    </div>
  )
}

export function FacetFilterGroup(props: FacetFilterGroupProps) {
  return (
    <QueryClientProvider client={new QueryClient}>
      <FilterProvider buckets={props.aggregation.buckets} searchEnabled={props.search}>
        <FacetFilterGroupModel {...props} />
      </FilterProvider>
    </QueryClientProvider>
  )
}

// Storybook specific function only adds aggregationTarget prop
export function StoryBookFacetFilterGroup({ aggregation, aggregationTarget, ...props}: StoryBookFacetFilterGroupProps) {
  return (
    <FacetFilterGroup
      aggregation={aggregation[aggregationTarget] as TermsAggregation}
      {...props}
    />
  )
} 