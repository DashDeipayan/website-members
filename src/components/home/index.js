import { useRouter } from 'next/router';
import Members from '@components/members';
import NewMembers from '@components/new-members';
import UserProfile from '@components/user-profile';
import MemberRoleUpdate from '@components/member-role-update';
import Designers from '@components/designers';
import { userContext } from '@store/user/user-context';
import { useState } from 'react';

import styles from '@components/home/home.module.scss';

import {
  BRAND_NAME,
  MEMBERS_TITLE,
  NEW_MEMBERS_TITLE,
} from '@constants/AppConstants';

const Home = () => {
  const { showMemberRoleUpdateModal, isSuperUserMode } = userContext();

  const { query } = useRouter() || { query: { dev: false } };
  const { dev } = query;
  const [optionKey, setOptionKey] = useState(false);

  return (
    <div
      className={styles.container}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Alt') {
          setOptionKey(true);
        }
      }}
      onKeyUp={() => setOptionKey(false)}
    >
      {dev && <UserProfile />}
      <img
        className={styles.img}
        src="/images/Real-Dev-Squad@1x.png"
        alt="real-dev squad"
      />
      <h1 className={styles.heading}>Designers</h1>
      <Designers />
      <h1 className={styles.heading}>{`${BRAND_NAME} ${MEMBERS_TITLE}`}</h1>
      {isSuperUserMode && (
        <div id="memberRoleUpdateModal">
          {showMemberRoleUpdateModal && <MemberRoleUpdate />}
        </div>
      )}
      <Members optionKey={optionKey} />
      <h1 className={styles.heading}>{NEW_MEMBERS_TITLE}</h1>
      <NewMembers optionKey={optionKey} />
    </div>
  );
};

export default Home;
