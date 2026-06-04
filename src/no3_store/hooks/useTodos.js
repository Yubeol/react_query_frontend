import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    todosAllGetApi,
    todosAllPostApi,
    todosAllPutApi,
    todosAllDeleteApi
} from "../apis/todos.api";

export const useAllGetTodo = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: todosAllGetApi
    })
}

export const useAllPostTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todosAllPostApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["todos"],
                (old = []) => [
                    ...old, dataObj
                ]
            )
            // 캐쉬 제거, 데이터 다시 불러오기
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        }
    })
}

export const usePutUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todosAllPutApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["todos"],
                (old = []) => old.map(item =>
                    item.id === dataObj.id ?
                        dataObj : item
                )
            );
            queryClient.setQueryData(
                ["todos", dataObj.id],
                dataObj
            );
        }
    })
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todosAllDeleteApi,
        onSuccess: (_, id) => {  // 첫 번째는 반환값(undefined), 두 번째가 mutate에 넘긴 인자
            queryClient.setQueryData(
                ["todos"],
                (old = []) => old.filter(item => item.id !== id)
            );
            queryClient.removeQueries(["todos", id]);

        }
    })
}