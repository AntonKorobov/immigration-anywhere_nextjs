import useSWRMutation from 'swr/mutation';

import { POSTReviewsRequest, POSTReviewsResponse } from './types';
import { useSWRConfig } from 'swr';

async function postReview(url: string, { arg }: { arg: POSTReviewsRequest }) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((r) => r.json());

  return response as unknown as POSTReviewsResponse;
}

export function usePostReview() {
  const { trigger, isMutating } = useSWRMutation(`/api/reviews`, postReview);
  const { mutate } = useSWRConfig();

  return {
    postReview: async (data: POSTReviewsRequest) => {
      const response = await trigger(data);
      mutate('/api/locations');
      // TODO Try to move mutation in feature component
      return { isSuccess: response.isSuccess };
    },
    isPostingReview: isMutating,
  };
}
