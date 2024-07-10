import { getThreadById } from "@/app/api/threads/[id]/route";
import {
  addThreadComment,
  deleteThreadComment,
  updateThreadComment,
} from "@/app/api/threads/comment/route";
import { IEditThreadById, editThreadById } from "@/app/api/threads/edit/route";
import { updateThreadsLikes } from "@/app/api/threads/like/route";
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_THREAD_BY_ID],
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_THREAD_BY_ID],
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_THREAD_BY_ID],
      });
    },
  });
};

// get thread by id

export const useGetThreadById = (threadId: string) => {
  return useQuery<IThread | null, Error>({
    queryKey: [QUERY_KEYS.GET_THREAD_BY_ID],
    queryFn: () => getThreadById(threadId),
  });
};

// update thread likes
export const useUpdateThreadLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      threadId,
      userEmail,
    }: {
      threadId: string;
      userEmail: string;
    }) => updateThreadsLikes({ threadId, userEmail }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_THREADS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_THREAD_BY_ID],
      });
    },
  });
};

// editing thread

export const useEditThreadById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, content, threadId }: IEditThreadById) =>
      editThreadById({ title, content, threadId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_THREADS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_THREAD_BY_ID],
      });
    },
  });
};
