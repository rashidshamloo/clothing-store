import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <section className="mx-auto my-[48px] flex w-full max-w-[904px] flex-col items-center justify-center gap-[48px]">
        {children}
      </section>
    </Suspense>
  );
}
