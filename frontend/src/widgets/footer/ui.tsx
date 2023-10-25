import style from './footer.module.scss';

import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.FooterCopyright}>© 2023 Anton Korobov</div>
      <div className={style.linksContainer}>
        <Link href="https://github.com/NewAnton">
          <Image src="/assets/iconmonstr-github-2.svg" alt="github logo" width="50" height="50" className={style.socialLinkImg} />
        </Link>
      </div>
    </footer>
  );
}
