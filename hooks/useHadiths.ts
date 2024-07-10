import { ISaveHadith, saveHadith } from "@/app/api/user/hadith/route";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export const useSaveHadith = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ hadithId, userEmail }: ISaveHadith) =>
      saveHadith({ hadithId, userEmail }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER_PROFILE],
      });
    },
  });
};
