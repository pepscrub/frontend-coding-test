import { useScholar } from '@/api';
import { Bucket } from '@/models/Bucket';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';
import { FacetFilter, FacetFilterGroupProps } from './FacetFilter';

interface Props extends PropsWithChildren {}

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

export function FacetFilterGroup(props: FacetFilterGroupProps) {
  return (
    <QueryClientProvider client={new QueryClient}>
      <FilterProvider>
        <FacetFilterGroupModel {...props} />
      </FilterProvider>
    </QueryClientProvider>
  )
}

export function FacetFilterGroupModel({ aggregation, label }: FacetFilterGroupProps) {
  const [show, setShow] = useState(true)
  const { filteredList } = useFilter();
  const filterKey = `${label.replace(/\s.*/, '').toLowerCase()}.must`;
  const filter = encodeURI(filteredList.map(({ key }) => `${filterKey}=${key}`).join('&'));

  const { data } = useScholar({
      q: `aggregation.enabled:${show}${filter.length > 0 ? `&${filter}` : ''}`,
      authorship: filterKey.includes('author') && !!filter.length,
      inventorship: filterKey.includes('inventor') && !!filter.length
    },
    true,
    1
  );
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
