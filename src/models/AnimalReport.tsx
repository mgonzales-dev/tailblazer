import AnimalType from "@models/AnimalType.tsx";
import ReportStatus from "@models/ReportStatus.tsx";

export type AnimalReport = {
  id: string;
  name: string;
  type: AnimalType;
  description: string;
  contact: {
    contactName: string;
    contactPhone: string;
    contactEmail: string;
  };
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: ReportStatus;
  createdAt: string;
  password: string;
}