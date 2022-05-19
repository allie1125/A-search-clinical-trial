import { useRecoilState } from 'recoil';
import { BsSearch } from 'react-icons/bs';

import { searchedWordState, keyDownState } from 'states/clinicalTrial';

import styles from './searchBar.module.scss';

const SearchBar = () => {
  const [, setSearchWord] = useRecoilState(searchedWordState);
  const [keyEvent, setKeyEvent] = useRecoilState(keyDownState);

  const handleSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.currentTarget.value.trim());
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    switch (e.code) {
      case 'ArrowDown':
        setKeyEvent((prev) => prev + 1);
        break;
      case 'ArrowUp':
        setKeyEvent((prev) => prev - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchBar}>
        <form onSubmit={submitForm}>
          <BsSearch className={styles.reactIcons} />
          <input
            type='text'
            onKeyDown={handleKeyDown}
            onChange={handleSearchWord}
            placeholder='질환명을 입력해 주세요.'
          />
        </form>
        <button type='button'>검색</button>
      </div>
    </div>
  );
};

export default SearchBar;
