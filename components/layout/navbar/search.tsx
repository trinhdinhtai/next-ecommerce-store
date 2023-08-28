"use client";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/helpers/url";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue(searchParams?.get("q") || "");
  }, [searchParams, setSearchValue]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const val = event.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/search", newParams));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
    >
      <div className="relative w-[400px]">
        <Input
          name="search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search for products ..."
          autoComplete="off"
          className="rounded-2xl"
        />
      </div>
    </form>
  );
};

export default Search;