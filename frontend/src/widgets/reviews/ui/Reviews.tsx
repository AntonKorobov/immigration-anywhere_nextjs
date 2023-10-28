import { Review } from '@/entities/review/';
import { ModalWindow } from '@/shared/ui/modalWindow';
import { useGetReviews } from '../model/useGetReviews';

interface IReviews {
  isOpen: boolean;
  locationId: number;
  locationName: string;
  onClose: () => void;
}

export function Reviews({ isOpen, locationId, onClose, locationName }: IReviews) {
  const [reviews] = useGetReviews(locationId);

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose} title={locationName}>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          return (
            <Review
              key={review.review_id}
              userName={review.user_name}
              rating={review.rating}
              reviewText={review.review_text}
            />
          );
        })
      ) : (
        <p>Loading...</p> //TODO spinner
      )}
    </ModalWindow>
  );
}
