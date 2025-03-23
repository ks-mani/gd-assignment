import { useEffect, useState } from "react";
import { useFullRepoDataStore, useMinRepoDataStore } from "../store/repoData";

const useFetchRepoData = () => {
  const { fullRepoData, setFullRepoData } = useFullRepoDataStore();
  const { minRepoData, setMinRepoData } = useMinRepoDataStore();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

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
        })
        .catch((e) => {
          setHasError(true);
          setErrMessage(e.message);
        });
    }
  }, [minRepoData, fullRepoData, setMinRepoData, setFullRepoData]);

  useEffect(() => {
    if (hasError) {
      throw new Error(errMessage);
    }
  }, [hasError, errMessage]);

  return isLoading;
};

export default useFetchRepoData;
