const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export async function uploadImage(file: File): Promise<string> {
  if (!API_KEY)
    throw new Error("Missing ImgBB API key");

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
  );

  if (!res.ok)
    throw new Error("Image upload failed");

  const data = await res.json();
  return data.data.url;
}