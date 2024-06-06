import {
  createThread,
  deleteThread,
  getRecentThreads,
} from "@/app/api/threads/route";
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
