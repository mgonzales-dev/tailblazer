import {useEffect, useRef, useState, type SubmitEventHandler} from "react";
import {AnimalType, ReportStatus, type AnimalReport} from "@models/Models";
import {getReports, reverseGeocode, saveReports, uploadImage} from "@services/Services";

type CreateReportFormState = {
  name: string;
  type: AnimalType;
  description: string;
  imageFile: File | null;
  contact: {
    contactName: string;
    contactPhone: string;
    contactEmail: string;
  };
  location: {
    lat: number | null;
    lng: number | null;
    address: string;
  };
  password: string;
};

const initialForm: CreateReportFormState = {
  name: "",
  type: AnimalType.Dog,
  description: "",
  imageFile: null,
  contact: {
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  },
  location: {
    lat: null,
    lng: null,
    address: "",
  },
  password: "",
};

function useCreateReportForm({
                               show,
                               onClose,
                               onCreated,
                             }: {
  show: boolean;
  onClose: () => void;
  onCreated: () => Promise<void> | void;
}) {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (show) {
      setForm(initialForm);
      setValidated(false);
    }
  }, [show]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;

    if (formEl.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (form.location.lat === null || form.location.lng === null) {
      setValidated(true);
      return;
    }

    try {
      setIsSubmitting(true);

      let imageUrl = "";
      if (form.imageFile) {
        imageUrl = await uploadImage(form.imageFile);
      }

      const reports = await getReports();
      
      const newReport: AnimalReport = {
        id: Date.now().toString(),
        name: form.name,
        type: form.type,
        description: form.description,
        contact: form.contact,
        imageUrl,
        location: {
          lat: form.location.lat,
          lng: form.location.lng,
          address: form.location.address,
        },
        status: ReportStatus.Lost,
        createdAt: new Date().toISOString(),
        password: form.password,
      };

      await saveReports([...reports, newReport]);
      await onCreated();
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Failed to submit report");
    } finally {
      setIsSubmitting(false);
    }
  };

  async function handleMapPick(lat: number, lng: number) {
    try {
      const address = await reverseGeocode(lat, lng);
      setForm((prev) => ({
        ...prev,
        location: {lat, lng, address},
      }));
    } catch {
      alert("Could not get address.");
    }
  }

  function handleReset() {
    setForm(initialForm);
    setValidated(false);
    if (inputFile.current) {
      inputFile.current.value = "";
    }
  }

  function handleClose() {
    setForm(initialForm);
    setValidated(false);
    onClose();
  }

  return {
    form,
    setForm,
    isSubmitting,
    validated,
    inputFile,
    handleSubmit,
    handleMapPick,
    handleReset,
    handleClose,
  };
}

export default useCreateReportForm;