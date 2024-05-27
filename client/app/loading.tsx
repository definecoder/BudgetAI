

import { Loader } from '@mantine/core';

const Loading = () => {
  return (
    <div className=' h-[100vh] flex justify-center items-center'>
      <Loader color="blue" size={100} type="dots" />
    </div>
  );
}

export default Loading