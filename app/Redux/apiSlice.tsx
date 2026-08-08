import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://us-central1-summaristt.cloudfunctions.net/'}),
    endpoints: (builder) => ({
        getSelectedBook : builder.query<any, string>({
            query: () => `getBooks?status=selected`,
        }),
        getRecommendedBooks : builder.query<any, string>({
            query: () => `getBooks?status=recommended`
        }),
        getSuggestedBooks : builder.query<any, string>({
            query: () => `getBooks?status=suggested`
        }),
        getInsideBook : builder.query<any, string>({
            query: (id) => `getBook?id=${id}`
        }),

    })
})

export const { useGetSelectedBookQuery, useGetRecommendedBooksQuery, useGetSuggestedBooksQuery, useGetInsideBookQuery} = apiSlice