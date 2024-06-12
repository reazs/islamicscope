import {
  addThreadComment,
  deleteThreadComment,
  updateThreadComment,
} from "@/app/api/threads/comment/route";
import {
  createThread,
  deleteThread,
  getRecentThreads,
} from "@/app/api/threads/route";
import {
  getCurrentUserProfile,
  getUpdatedUserProfileImage,
} from "@/app/api/user/route";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { ICreateThread, IThread } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useThreads = () => {
  return useQuery<IThread[], Error>({
    queryKey: [QUERY_KEYS.GET_RECENT_THREADS],
    queryFn: getRecentThreads,
  });
};

export const useCreateThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (thread: ICreateThread) => createThread(thread),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_THREADS],
      });
    },
  });
};

export const useDeleteThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteThread(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_THREADS],
      });
    },
  });
};

export const useGetCurrentUserProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER_PROFILE],
    queryFn: getCurrentUserProfile,
  });
};

export const useUpdateUserProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => getUpdatedUserProfileImage(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER_PROFILE],
      });
    },
  });
};

export const useAddThreadComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      comment,
      threadId,
    }: {
      comment: string;
      threadId: string;
    }) => addThreadComment({ comment: comment, threadId: threadId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_THREADS],
      });
    },
  });
};

export const useDeleteThreadComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      threadId,
      commentId,
    }: {
      threadId: string;
      commentId: string;
    }) => deleteThreadComment({ threadId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_THREADS],
      });
    },
  });
};

export const useUpdateThreadComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      threadId,
      commentId,
      newComment,
    }: {
      threadId: string;
      commentId: string;
      newComment: string;
    }) =>
      updateThreadComment({
        threadId: threadId,
        commentId: commentId,
        newComment: newComment,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_THREADS],
      });
    },
  });
};
