import type { Metadata } from 'next';

import { getPage } from '@/lib/shopify';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);

  if (!page) return notFound();

  return (
    <>
      <h1 className="mb-8 text-center font-lora text-[clamp(32px,20px_+_2vw,40px)] font-bold text-darkPurple md:mb-16">
        {page.title}
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: page.body as string }}
        className="leading-lose text-center text-[18px] text-purple prose-headings:my-8 prose-headings:font-lora prose-headings:text-[clamp(24px,16px_+_2vw,30px)] prose-headings:font-semibold prose-headings:text-darkPurple md:text-left"
      />
      <p className="mt-16 text-sm italic leading-relaxed text-purple md:leading-normal">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(page.updatedAt))}.`}
      </p>
    </>
  );
}
