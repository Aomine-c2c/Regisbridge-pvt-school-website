import Link from 'next/link';
import Image from 'next/image';

interface PathwayCardProps {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  linkText: string;
}

export default function PathwayCard({
  badge,
  title,
  description,
  image,
  imageAlt,
  link,
  linkText,
}: PathwayCardProps) {
  return (
    <article className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative aspect-video md:aspect-auto md:min-h-[280px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="md:w-2/3 p-8 flex flex-col justify-center">
          <span className="bg-blue-100 text-brand-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide w-fit mb-2">
            {badge}
          </span>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {title}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>
          <Link
            href={link}
            className="self-start text-brand-primary font-bold text-sm uppercase tracking-wide flex items-center gap-1 group-hover:translate-x-1 transition-transform"
          >
            {linkText}
            <span className="material-symbols-outlined text-base" aria-hidden="true">chevron_right</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
