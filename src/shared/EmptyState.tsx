import Image, { StaticImageData } from 'next/image';
import { memo } from 'react';

type Props = {
  title: string;
  subTitle: string;
  img: string | StaticImageData;
  reset?: () => void;
};
const EmptyState = ({ title, subTitle, img, reset }: Props) => {
  return (
    <div className="w-full min-h-screen h-full flex flex-col gap-12 items-center justify-center">
      <div className="flex items-center flex-col justify-center gap-2">
        <h1 className="text-5xl">{title}</h1>
        <p className="text-xl text-slate-400">{subTitle}</p>
        {reset && (
          <button
            onClick={() => reset()}
            className="border border-slate-400 !mt-12 w-32 left-16 top-16 rounded-full px-4 py-2 font-bold h-14"
          >
            Retry
          </button>
        )}
      </div>
      <Image
        src={img}
        alt="not found"
        width={300}
        height={300}
        className="rounded-full w-[300px] h-[300px]"
      />
    </div>
  );
};

export default memo(EmptyState);
