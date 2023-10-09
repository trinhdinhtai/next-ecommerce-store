import { ReadonlyURLSearchParams } from "next/navigation"

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`

  return `${pathname}${queryString}`
}

export function toTitleCase(str: string) {
  return str.replace(/-/g, " ")
}
