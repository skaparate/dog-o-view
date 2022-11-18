import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import config from "../../config";
import {Breed} from "../../types";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {applyFilters} from "../filters/filtersSlice";

function convertMessageToBreeds({message}: { message: object }, meta: any) {
    console.log('Meta:', message);
    const breeds: Array<Breed> = []

    for (let i in message) {
        const children: string[] = message[i as keyof typeof message] as Array<string>
        breeds.push({
            name: i,
            children
        });
    }

    meta.dispatch(applyFilters({
        data: breeds,
        active: []
    }));

    return breeds
}

type CustomResult = {
        data: any
        error?: undefined
        meta?: { request?: Request; response?: Response, dispatch: ThunkDispatch<any, any, any> }
    }
    | {
    error: FetchBaseQueryError
    data?: undefined
    meta?: { request?: Request; response?: Response, dispatch: ThunkDispatch<any, any, any> }
};


const baseQuery = fetchBaseQuery({
    baseUrl: config.apiUrl,
});

const customBaseQuery: BaseQueryFn<string | FetchArgs, any | undefined, FetchBaseQueryError> = async (args, api, options = {}) => {
    const {error, data, meta} = await baseQuery(args, api, options);
    let result: CustomResult;

    if (error !== undefined) {
        result = {
            error,
            data,
            meta: {
                ...meta,
                dispatch: api.dispatch
            },
        }
    } else {
        result = {
            error,
            data,
            meta: {
                ...meta,
                dispatch: api.dispatch,
            }
        }
    }

    return result;
}

export const breedsApi = createApi({
    reducerPath: 'breedsApi',
    baseQuery: customBaseQuery,
    endpoints: (build) => ({
        /**
         * Retrieve the list of all breeds from the API
         */
        getBreedList: build.query<Array<Breed>, void>({
            query: () => '/breeds/list/all',
            transformResponse: convertMessageToBreeds
        }),
        /**
         * Retrieves a single random image for the specified breed.
         * For a sub breed, pass the parent and sub breed like this:
         *
         * parent/child => australian/sheppard
         */
        getRandomImage: build.query<string, string>({
            query: (breed: string) => `/breed/${breed}/images/random`,
            transformResponse({message}) {
                return message;
            }
        })
    })
});

export const {
    useGetBreedListQuery,
    useGetRandomImageQuery,
} = breedsApi;
