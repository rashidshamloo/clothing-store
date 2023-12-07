'use client';

// react-loading
import { default as ReactLoading } from 'react-loading';

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <ReactLoading type="spokes" width={100} color={'#9d9cc9'} className="bg-no-repeat" />
    </div>
  );
};

export default Loading;
