import { useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BsSearch } from 'react-icons/bs';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

import useDebounce from 'hooks/useDebounce';
import { searchedWordState, keyDownState } from 'states/clinicalTrial';
import { getClinicalTrialSearchApi } from 'services/search';
import { IItem, IBody } from 'types/clinicalTrial.d';

import styles from './searchRecommendation.module.scss';

const SearchRecommendation = () => {
  const searchWord = useRecoilValue(searchedWordState);
  const [keyDown, setKeyDown] = useRecoilState(keyDownState);
  const debouncedSearch = useDebounce(searchWord, 500);

  useEffect(() => {
    setKeyDown(-1);
  }, [debouncedSearch]);

  const { isFetching, data } = useQuery(
    ['getClinicalTrialSearchApi', debouncedSearch],
    () =>
      getClinicalTrialSearchApi({
        pageNo: 1,
        searchText: debouncedSearch,
      }),
    {
      onSuccess: (res: IBody) => {
        setKeyDown(0);
      },
      enabled: Boolean(debouncedSearch),
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 6 * 10 * 100000,
    }
  );

  const setSearchTextBold = useCallback(
    (sickNm: any) => {
      const codes = sickNm.replace(RegExp(debouncedSearch, 'g'), `<mark>${debouncedSearch}</mark>`);
      const cleanHTML = DOMPurify.sanitize(codes, {
        USE_PROFILES: { html: true },
      });
      return <div>{parse(cleanHTML)}</div>;
    },
    [debouncedSearch]
  );

  if (isFetching) return <div className={styles.emptyResult}>로딩중....</div>;
  if (data?.totalCount === 0) return <div className={styles.emptyResult}>검색 결과가 없습니다.</div>;

  return (
    <div className={styles.container}>
      {debouncedSearch && (
        <div className={styles.recommendationWrapper}>
          <ul>
            {debouncedSearch && <li className={`${styles.rcmdTitle}${styles.off}`}>추천 검색어</li>}
            {data?.items.item.map(({ sickCd, sickNm }: IItem, i: number) => (
              <li key={`${i}-${sickCd}`} className={i === keyDown - 1 ? styles.selected : styles.notSelected}>
                <span>
                  <BsSearch className={styles.reactIcons} />
                </span>
                <span className={styles.searchWord}>{setSearchTextBold(sickNm)}</span>
                {/* <span className={styles.searchWord}>{stringWithHtml(sickNm)}</span> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchRecommendation;
