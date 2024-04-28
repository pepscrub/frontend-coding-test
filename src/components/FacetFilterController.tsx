import { Bucket } from "@/models/Bucket";
import FuzzySearch from 'fuzzy-search';
import { Dispatch, FC, PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props extends PropsWithChildren {
  buckets: Bucket[];
  searchEnabled?: boolean;
}

export interface ModifiedBucket extends Bucket {
  checked: boolean;
  original_key: string;
}

interface Context {
  search: string;
  searchEnabled?: boolean;
  searchList: ModifiedBucket[];
  searchResults: ModifiedBucket[];
  updateAllBuckets: (checked?: boolean) => void;
  setSearch: Dispatch<string>;
  updateSelected: (bucket: ModifiedBucket, checked: boolean) => void;
}

const context = createContext<Context | undefined>(undefined);


export const FilterProvider: FC<Props> = ({ buckets, children, searchEnabled }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const translateBucket = useCallback(({ key, doc_count }: Bucket) => ({ key: t(key), original_key: key, doc_count, checked: false }), [t])
  const sortBucket = (a: ModifiedBucket, b: ModifiedBucket) => {
    const desc = b.doc_count - a.doc_count;
    const aText = a.key.toLowerCase();
    const bText = b.key.toLowerCase();
    if(desc !== 0) return desc;
    return (aText < bText) ? -1 : Number(aText > bText)
  };
  
  // Use translated values for search instead of raw
  const [searchList, setSearchList] = useState<ModifiedBucket[]>(buckets.map(translateBucket).sort(sortBucket));
  const [searchResults, setSearchResults] = useState<ModifiedBucket[]>([])

  const updateSelected = (bucket: ModifiedBucket, checked: boolean): void => {
    const updatedList = [...searchResults.filter(({ key }) => key !== bucket.key), { ...bucket, checked }].sort(sortBucket);
    setSearchList(updatedList.sort(sortBucket));
  }

  const updateAllBuckets = (checked: boolean = true) => {
    setSearchList((searchResults) => searchResults.map((bucket) => ({ ...bucket, checked })));
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
        updateAllBuckets,
        setSearch,
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