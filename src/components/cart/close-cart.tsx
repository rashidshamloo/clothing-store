import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md text-darkPurple transition-colors">
      <XMarkIcon
        className={clsx('h-10 transition-all duration-200 ease-in-out hover:scale-110', className)}
      />
    </div>
  );
}
