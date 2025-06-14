export async function uploadToCloudinary(file: File) {
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

  if (!uploadPreset || !cloudName) {
    throw new Error("Cloudinary config is missing.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await res.json();
  return data.secure_url;
}
