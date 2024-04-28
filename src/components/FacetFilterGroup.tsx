import { Aggregation } from '@/models/Aggregation';
import { TermsAggregation } from '@/models/TermsAggregation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { FacetFilter } from './FacetFilter';
import { FilterProvider, useFilter } from './FacetFilterController';
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


export function FacetFilterGroupModel({ label, search: searchEnabled, searchText = 'Search' }: FacetFilterGroupProps) {
  const [show, setShow] = useState(true);
  const { setSearch, updateAllBuckets, searchList } = useFilter();
  const allChecked = !searchList.every(({ checked }) => checked);
  // TODO: useScholar with aggregation enabled:show
  return (
    <div className="ml-2 border">
      {searchEnabled 
      && <Input
          type="search"
          onKeyUp={(e) => setSearch(e.currentTarget.value)}
          placeholder={`${searchText} ${label}`}
        />
      }
      <Button onClick={() => updateAllBuckets(allChecked)}>{ allChecked ? 'Select' : 'Deselect'} All</Button>
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