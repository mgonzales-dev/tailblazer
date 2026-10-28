import {useEffect, useState} from "react";
import type {AnimalReport} from "@models/Models";
import {getReports} from "@services/Services";

function useReports() {
  const [reports, setReports] = useState<AnimalReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function reloadReports() {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setError(null);
      const data = await getReports();
      setReports(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reloadReports().catch(console.error);
  }, []);

  return {
    reports,
    setReports,
    loading,
    error,
    reloadReports,
  };
}

export default useReports;