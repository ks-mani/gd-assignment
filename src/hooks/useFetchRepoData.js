import { useEffect, useState } from "react";
import { useFullRepoDataStore, useMinRepoDataStore } from "../store/repoData";

const useFetchRepoData = () => {
  const { fullRepoData, setFullRepoData } = useFullRepoDataStore();
  const { minRepoData, setMinRepoData } = useMinRepoDataStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (fullRepoData && minRepoData) {
      setIsLoading(false);
    }

    if (!fullRepoData && !minRepoData) {
      fetch("https://api.github.com/orgs/godaddy/repos")
        .then((res) => res.json())
        .then((data) => {
          const formattedData = data.map((item) => {
            return {
              id: item.id,
              name: item.name,
              description: item.description,
              language: item.language,
              updatedAt: item.updated_at,
              visibility: item.visibility,
            };
          });

          setIsLoading(false);
          setMinRepoData(formattedData);
          setFullRepoData(data);
        });
    }
  }, [minRepoData, fullRepoData, setMinRepoData, setFullRepoData]);

  return isLoading;
};

export default useFetchRepoData;
