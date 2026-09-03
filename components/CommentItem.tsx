"use client";

export default function CommentItem({
  name,
  image,
  comment,
}: {
  name: string;
  image: string | { src: string };
  comment: string;
}) {
  return (
    <div className="bg-blue-900 rounded-lg p-4 sm:p-8 w-full transition-all duration-300 hover:shadow-xl min-h-[250px] sm:min-h-[300px] flex items-center mx-auto max-w-sm sm:max-w-4xl">
      <div className="flex items-start gap-3 sm:gap-6 w-full">
        <img
          src={typeof image === "string" ? image : image.src}
          alt={`${name} відгук`}
          className="rounded-full flex-shrink-0 object-cover w-[60px] h-[60px] sm:w-[120px] sm:h-[120px]"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-2xl font-semibold text-white mb-2 sm:mb-4">
            {name}
          </h3>
          <p className="text-white text-sm sm:text-lg leading-relaxed opacity-90 line-clamp-6 sm:line-clamp-none overflow-hidden">
            {comment}
          </p>
        </div>
      </div>
    </div>
  );
}
