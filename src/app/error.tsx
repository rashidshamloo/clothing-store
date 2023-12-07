'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-16 flex max-w-xl flex-col gap-2">
      <h2 className="text-xl font-bold text-veryDarkPurple">Error!</h2>
      <p className="my-2 text-darkPurple">
        There was an issue with our storefront. This could be a temporary issue, please try your
        action again.
      </p>
      <button className="btn text-[20px]" onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}
