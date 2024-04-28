import { Aggregation } from '@/models/Aggregation';
import { Bucket } from '@/models/Bucket';
import { TermsAggregation } from '@/models/TermsAggregation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';
import { FacetFilter, FacetFilterGroupProps } from './FacetFilter';

interface Props extends PropsWithChildren {}

interface StoryBookFacetFilterGroupProps {
  aggregationTarget: string;
  aggregation: Record<string, Aggregation>;
  label: string
}

interface Context {
  filteredList: Bucket[];
  selected: Bucket[];
  updateFiltered: () => void;
  updateSelected: (bucket: Bucket, checked: boolean) => void;
}

const context = createContext<Context | undefined>(undefined);

const FilterProvider: FC<Props> = ({ children }) => {
  const [selected, setSelected] = useState<Bucket[]>([]);
  const [filteredList, setFilteredList] = useState<Bucket[]>([]);

  const updateSelected = (bucket: Bucket, checked: boolean) => {
    if(!checked) return setSelected((selectedList) => selectedList.filter(({ key }) => key !== bucket.key));
    setSelected((selection) => [...selection, bucket])
  }

  const updateFiltered = () => {
    setFilteredList(selected)
  }

  return (
    <context.Provider
      value={{
        filteredList,
        selected,
        updateFiltered,
        updateSelected,
      }}
    >
      {children}
    </context.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = (): Context => {
  const name = FilterProvider.name;
  const data = useContext(context);
  if (!data) throw new Error(`Missing ${name} in tree above ${name}`);
  return data;
}

export function FacetFilterGroupModel({ aggregation, label }: FacetFilterGroupProps) {
  const [show, setShow] = useState(true)
  // TODO: useScholar with aggregation enabled:show
  return (
    <div className="ml-2 border">
      <div className={'font-bold p-2 cursor-pointer'} onClick={() => setShow(!show)}>
        {label}
      </div>
      {show && <FacetFilter aggregation={aggregation} />}
    </div>
  )
}

export function FacetFilterGroup(props: FacetFilterGroupProps) {
  return (
    <QueryClientProvider client={new QueryClient}>
      <FilterProvider>
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