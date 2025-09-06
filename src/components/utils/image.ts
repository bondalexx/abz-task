export async function ensureImageConstraints(
  file: File,
  opts: { minWidth: number; minHeight: number }
) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = url;
    });
    return img.width >= opts.minWidth && img.height >= opts.minHeight;
  } finally {
    URL.revokeObjectURL(url);
  }
}
