export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      {
        method: "GET",
        headers: {
          "User-Agent": "TailBlazer",
        },
      }
  );

  if (!res.ok) {
    throw new Error(`HTTP ERROR: ${res.status}`);
  }
  
  const data = await res.json();
  const address = data.address ?? {};

  const streetNumber = address.house_number ?? "";
  const streetName = address.road ?? "";
  const street = [streetNumber, streetName].filter(Boolean).join(" ").trim();

  const city =
      address.city ??
      address.town ??
      address.village ??
      address.hamlet ??
      "";

  const province = address.state ?? "";
  const country = address.country ?? "";
  const postalCode = address.postcode ?? "";

  return [street, city, province, country, postalCode]
  .filter((part) => part && part.trim() !== "")
  .join(", ");
}