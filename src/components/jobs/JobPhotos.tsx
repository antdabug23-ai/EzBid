interface JobPhotosProps {
  photos: { id: string; url: string }[];
}

export function JobPhotos({ photos }: JobPhotosProps) {
  if (photos.length === 0) {
    return <p className="text-sm text-slate-500">No photos uploaded.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {photos.map((photo) => (
        // eslint-disable-next-line @next/next/no-img-element
        <a
          key={photo.id}
          href={photo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.url}
            alt="Job photo"
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </a>
      ))}
    </div>
  );
}
