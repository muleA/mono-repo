import {IconMoodEmpty} from '@tabler/icons'
function EmptyState() {
  return (
    <div className=" w-full h-full flex flex-col justify-center items-center gap-2">

      <h1 className=" text-lg text-gray-400"><IconMoodEmpty/>No Data</h1>
    </div>
  );
}

export default EmptyState;
