import style from './Header.module.scss';

export function Header() {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <a href="#" className={style.title}>
          <img className={style.titleImg} src="/assets/logo 1.png" alt="logo" />
          <h1 className={style.titleH1}>
            IMMIGRATION <br />
            <span className={style.h1Highlight}>ANYWHERE</span>
          </h1>
        </a>
      </div>
    </header>
  );
}
