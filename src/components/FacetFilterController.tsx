import { Bucket } from "@/models/Bucket";
import FuzzySearch from 'fuzzy-search';
import { FC, PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface ModifiedBucket extends Bucket {
  checked: boolean;
  original_key: unknown;
}

// eslint-disable-next-line react-refresh/only-export-components
export enum SELECTION_TYPE {
  all,
  current
}

interface Props extends PropsWithChildren {
  buckets: Bucket[];
  searchEnabled?: boolean;
}

interface Context {
  search: string;
  searchEnabled?: boolean;
  searchList: ModifiedBucket[];
  searchResults: ModifiedBucket[];
  selectionType: SELECTION_TYPE
  setIsDate: (isDate: boolean) => void;
  setSearch: (search: string) => void;
  setSelectionType: (selectionType: SELECTION_TYPE) => void;
  updateAllBuckets: (checked?: boolean) => void;
  updateSelected: (bucket: ModifiedBucket, checked: boolean) => void;
}

const context = createContext<Context | undefined>(undefined);


export const FilterProvider: FC<Props> = ({ buckets, children, searchEnabled }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [isDate, setIsDate] = useState(false);
  const [selectionType, setSelectionType] = useState(SELECTION_TYPE.all);

  const translateBucket = useCallback(
    ({ key, doc_count, key_as_string }: Bucket & { key_as_string?: string }) => (
      { key: t(key), original_key: key, doc_count, checked: false, key_as_string }
    ), [t]
  )
  const sortBucket = (a: ModifiedBucket, b: ModifiedBucket) => {
    const desc = b.doc_count - a.doc_count;
    const aText = a.key.toLowerCase();
    const bText = b.key.toLowerCase();
    if(isDate) return b.original_key as number - (a.original_key as number);
    if(desc !== 0) return desc;
    return (aText < bText) ? -1 : Number(aText > bText)
  };
  
  // Use translated values for search instead of raw
  const [searchList, setSearchList] = useState<ModifiedBucket[]>(buckets.map(translateBucket).sort(sortBucket));
  const [searchResults, setSearchResults] = useState<ModifiedBucket[]>([])

  const updateSelected = (bucket: ModifiedBucket, checked: boolean): void => {
    const updatedList = [...searchList.filter(({ key }) => key !== bucket.key), { ...bucket, checked }].sort(sortBucket);
    setSearchList(updatedList.sort(sortBucket));
  }

  const updateAllBuckets = (checked: boolean = true) => {
    const updateAll = () => setSearchList((searchResults) => searchResults.map((bucket) => ({ ...bucket, checked })))
    if (search.trim() === '') return updateAll()
    switch (selectionType) {
      case SELECTION_TYPE.all: {
        updateAll()
        break;
      }
      case SELECTION_TYPE.current: {
        setSearchResults((searchResults) => searchResults.map((bucket) => ({ ...bucket, checked })));
        break;
      }
      default: {
        updateAll()
      }
    }
  }

  useEffect(() => {
    setSearchList(buckets.map(translateBucket).sort(sortBucket))
  }, [buckets, t, translateBucket]);

  useEffect(() => {
    if (search.trim() === '' || !searchEnabled) return setSearchResults(searchList);
    const searcher = new FuzzySearch(searchList, ['key'])
    setSearchResults(searcher.search(search));
  }, [search, searchList, searchEnabled]);

  return (
    <context.Provider
      value={{
        search,
        searchEnabled,
        searchList,
        searchResults,
        selectionType,
        setIsDate,
        setSearch,
        setSelectionType,
        updateAllBuckets,
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