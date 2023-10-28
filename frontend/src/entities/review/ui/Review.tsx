import style from './Review.module.scss';
import utils from '@/app/utils.module.scss';

import { clsx } from 'clsx';

interface IReviewProps {
  userName: string;
  rating: number;
  reviewText: string;
}

export function Review({ userName, reviewText, rating }: IReviewProps) {
  return (
    <div className={style.review}>
      <div className={style.reviewInfo}>
        <h3 className={clsx(utils.h3, style.userName)}>{userName || 'Anonym'}</h3>
        <div className={style.ratingWrapper}>
          {Array.from(Array(rating)).map((item, index) => (
            <img
              key={'rating' + index}
              className={style.reviewStar}
              src="./assets/HandDrawnStar.png"
              alt="звезда рейтинга"
            />
          ))}
        </div>
      </div>
      <p className={style.reviewText}>{reviewText}</p>
    </div>
  );
}
