import { useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';

import useDebounce from 'hooks/useDebounce';
import { searchedTrialState, searchedWordState, keyDownState } from 'states/clinicalTrial';
import { getClinicalTrialSearchApi } from 'services/search';
import { IResponse } from 'types/clinicalTrial.d';
import { BsSearch } from 'react-icons/bs';

import styles from './searchRecommendation.module.scss';

const SearchRecommendation = () => {
  const searchWord = useRecoilValue(searchedWordState);
  const keyDown = useRecoilValue(keyDownState);
  const [searchedDisease, setSearchedDisease] = useRecoilState(searchedTrialState);
  const debouncedSearch = useDebounce(searchWord, 500);

  useEffect(() => {
    console.log('searchedDisease?', searchedDisease);
  }, [searchedDisease]);

  const { isLoading, data } = useQuery(
    ['getClinicalTrialSearchApi', debouncedSearch],
    () =>
      getClinicalTrialSearchApi({
        pageNo: 1,
        searchText: debouncedSearch,
      }),
    {
      onSuccess: (data2: IResponse) => {
        console.log('Get data!', data2.response.body.items);
        const res: any = data2.response.body.items;
        setSearchedDisease(res);
      },
      enabled: !!searchWord,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 6 * 10 * 1000,
    }
  );
  console.log();

  // const setSearchTextBold = (sickNm: any) => {
  //   const codes = sickNm.replace(
  //     RegExp(debouncedSearch, 'g'),
  //     `<mark className=${styles.searchedText}>${debouncedSearch}</mark>`
  //   );
  //   return <div dangerouslySetInnerHTML={{ __html: codes }} />;
  // };

  const setSearchTextBold = useCallback(
    (sickNm: any) => {
      const codes = sickNm.replace(RegExp(debouncedSearch, 'g'), `<mark>${debouncedSearch}</mark>`);
      return <div dangerouslySetInnerHTML={{ __html: codes }} />;
    },
    [debouncedSearch]
  );

  return (
    <div className={styles.recommendationWrapper}>
      <ul>
        <li>추천 검색어</li>
        {isLoading && <li>로딩중....</li>}
        {searchWord &&
          data?.response.body.items.item.map(({ sickCd, sickNm }, i) => (
            <li key={`${i}-${sickCd}`} className={i + 1 === keyDown ? styles.selected : styles.notSelected}>
              <span>
                <BsSearch className={styles.reactIcons} />
              </span>
              <span className={styles.searchWord}>{setSearchTextBold(sickNm)}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchRecommendation;
