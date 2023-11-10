'use client';

import { useState } from 'react';

import { ReviewForm } from '@/features/createReview/ui/ReviewForm';
import { Button } from '@nextui-org/button';

export function MakeReview() {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  return (
    <>
      <Button
        className="px-unit-5"
        color="primary"
        onClick={() => setIsReviewFormOpen(true)}
      >
        Рассказать
      </Button>
      <ReviewForm isOpen={isReviewFormOpen} onClose={() => setIsReviewFormOpen(false)} />
    </>
  );
}
