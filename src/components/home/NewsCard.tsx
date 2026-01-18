import Link from 'next/link';
import Image from 'next/image';

interface NewsCardProps {
  href: string;
  image: string;
  imageAlt: string;
  category: string;
  categoryColor: 'blue' | 'purple' | 'amber';
  date: string;
  title: string;
}

const categoryColors = {
  blue: 'bg-brand-primary',
  purple: 'bg-purple-600',
  amber: 'bg-amber-600',
};

export default function NewsCard({
  href,
  image,
  imageAlt,
  category,
  categoryColor,
  date,
  title,
}: NewsCardProps) {
  return (
    <Link href={href} className="flex flex-col gap-3 group">
      <article className="rounded-xl overflow-hidden aspect-video relative">
        <Image
          src={image}
          alt={imageAlt}
          fill
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className={`absolute bottom-2 left-2 ${categoryColors[categoryColor]} text-white text-xs font-bold px-2 py-1 rounded`}>
          {category}
        </div>
      </article>
      <time dateTime={date} className="text-gray-500 text-xs font-medium">
        {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </time>
      <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-brand-primary transition-colors">
        {title}
      </h3>
    </Link>
  );
}
