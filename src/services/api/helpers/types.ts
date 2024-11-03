import { Request } from "express";

export type PickMatching<T> =
    {   [K in keyof T as T[K] extends Function ? K : never]: 
        ChangeReturnType<T[K], Parameters<T[K] extends (...args: any[]) => any ? T[K] : never>>}


type ChangeReturnType<K, NewReturn> = K extends (...args: any[]) => any
  ? (req: Request) => NewReturn
  : never;