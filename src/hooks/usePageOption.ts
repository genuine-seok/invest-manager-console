import { useState } from "react";

interface PageOption {
  q: string;
  _page: number;
  _limit: number;
}

export const usePageOption = () => {
  const [pageOption, setPageOption] = useState<PageOption>({
    q: "",
    _page: 1,
    _limit: 10,
  });

  return { pageOption, setPageOption };
};
