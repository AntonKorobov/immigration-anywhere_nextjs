import style from './page.module.scss';

import { WorldMapReviews } from '@/widgets/worldMapReviews';
import { MakeReview } from '@/widgets/makeReview/';

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <section className={style.info}>
          <p className={style.infoText}>
            Большое количество белорусов сейчас живут в различных странах мира.
          </p>
          <p className={style.infoTextSmall}>Вот что они говорят:</p>
        </section>
        <WorldMapReviews />
        <section className={style.review}>
          <div className={style.reviewMessage}>
            Расскажите нам про жизнь в вашей локации!
          </div>
          <MakeReview />
        </section>
      </div>
    </>
  );
}
