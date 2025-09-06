export async function fileFromUrl(url: string, name = "photo.jpg") {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
  const blob = await res.blob();
  const type =
    blob.type ||
    (name.toLowerCase().endsWith(".jpg") || name.toLowerCase().endsWith(".jpeg")
      ? "image/jpeg"
      : "application/octet-stream");
  return new File([blob], name, { type });
}
