import {useState} from "react";
import {ReportStatus, type AnimalReport} from "@models/Models";
import {getReports, saveReports} from "@services/Services";

function useMarkReportFound({
                              report,
                              onClose,
                              onUpdate,
                            }: {
  report: AnimalReport;
  onClose: () => void;
  onUpdate: () => Promise<void> | void;
}) {
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleMarkFound() {
    try {
      setError(null);

      if (password !== report.password) {
        setError("Incorrect password");
        return;
      }

      setIsSubmitting(true);
      const reports = await getReports();

      const updatedReports = reports.map((r) =>
          r.id === report.id ? {...r, status: ReportStatus.Found} : r
      );

      await saveReports(updatedReports);
      await onUpdate();
      setPassword("");
      setShowPasswordInput(false);
      onClose();
    } catch (err) {
      console.error("Failed to update report status:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    password,
    setPassword,
    showPasswordInput,
    setShowPasswordInput,
    isSubmitting,
    error,
    handleMarkFound,
  };
}

export default useMarkReportFound;