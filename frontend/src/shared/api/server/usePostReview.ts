import useSWRMutation from 'swr/mutation';

import { POSTReviewsRequest, POSTReviewsResponse } from './types';
import { useSWRConfig } from 'swr';

async function postReview(url: string, { arg }: { arg: POSTReviewsRequest }) {
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((r) => r.json());
}

export function usePostReview() {
  const { trigger, isMutating } = useSWRMutation(`/api/reviews`, postReview);
  const { mutate } = useSWRConfig();

  return {
    postReview: (data: POSTReviewsRequest) => {
      trigger(data);
      mutate('/api/locations');
      // TODO Try to move mutation in feature component
    },
    isPostingReview: isMutating,
  };
}
