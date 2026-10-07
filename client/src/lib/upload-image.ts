export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  const data = await res.json();

  // Serve a small face-centred square instead of the full-size original photo
  return data.secure_url.replace(
    "/upload/",
    "/upload/c_fill,g_face,w_400,h_400,f_auto,q_auto/",
  );
}
