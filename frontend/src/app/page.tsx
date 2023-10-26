import { WorldMap } from '@/widgets/worldMap';
import style from './page.module.scss';

import { Button } from '@nextui-org/button';

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <section className={style.info}>
          <p className={style.infoText}>Большое количество белорусов сейчас живут в различных странах мира.</p>
          <p className={style.infoTextSmall}>Вот что они говорят:</p>
        </section>
        <WorldMap />
        <section className={style.review}>
          <div className={style.reviewMessage}>Расскажите нам про жизнь в вашей локации!</div>
          <Button className="px-unit-5" color="primary">
            Рассказать
          </Button>
        </section>
      </div>
    </>
  );
}
