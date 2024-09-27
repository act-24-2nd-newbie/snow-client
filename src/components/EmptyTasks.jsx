import illustEmpty from '@/assets/illust_empty.png';

export default function EmptyTasks() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <img src={illustEmpty} width={240} height={180} alt="empty" />
      <p className="text-black/40">There is no task registered.</p>
    </div>
  );
}
