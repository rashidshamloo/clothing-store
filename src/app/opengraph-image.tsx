import OpengraphImage from '@/components/common/opengraph-image';

export const runtime = 'edge';

export default async function Image() {
  return await OpengraphImage();
}
