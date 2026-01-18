import Image from 'next/image';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

export default function TestimonialCard({ quote, name, role, avatar }: TestimonialCardProps) {
  return (
    <blockquote className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
      <span 
        className="material-symbols-outlined absolute top-6 right-6 text-gray-200 text-6xl select-none" 
        aria-hidden="true"
      >
        format_quote
      </span>
      <p className="text-gray-600 italic mb-6 relative z-10">
        "{quote}"
      </p>
      <footer className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden relative flex items-center justify-center">
          {avatar ? (
            <Image
              src={avatar}
              alt={`${name} avatar`}
              fill
              className="object-cover"
              sizes="40px"
            />
          ) : (
            <span className="text-gray-500 dark:text-gray-400 font-bold text-sm">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
        </div>
        <cite className="not-italic">
          <p className="font-bold text-gray-900 text-sm">{name}</p>
          <p className="text-gray-400 text-xs">{role}</p>
        </cite>
      </footer>
    </blockquote>
  );
}
