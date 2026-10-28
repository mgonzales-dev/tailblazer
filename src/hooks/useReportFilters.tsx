import {useMemo, useState} from "react";
import {AnimalType, ReportStatus, type AnimalReport} from "@models/Models";

function useReportFilters(reports: AnimalReport[]) {
  const [statusFilter, setStatusFilter] = useState<"all" | ReportStatus>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | AnimalType>("all");

  const filteredReports = useMemo(
      () =>
          reports.filter((report) => {
            const matchesStatus = statusFilter === "all" || report.status === statusFilter;
            const matchesType = typeFilter === "all" || report.type === typeFilter;
            return matchesStatus && matchesType;
          }),
      [reports, statusFilter, typeFilter]
  );

  const mapReports = useMemo(
      () => reports.filter((report) => report.status === ReportStatus.Lost),
      [reports]
  );
  
  return {
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredReports,
    mapReports,
  };
}

export default useReportFilters;