import { Skeleton } from "@/components/ui/skeleton"
export default function FolderSkel() {
  return (
    <>
      <div className="w-[50vw] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max mt-10">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Folders</h5>
        <h5 className=" hover:underline transition-all duration-300 no-underline">Add Folder</h5>

   </div>
   <div className="">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li><Skeleton className="w-[100px] h-[20px] rounded-full" /></li>
            <li><Skeleton className="w-[100px] h-[20px] rounded-full" /></li>
            <li><Skeleton className="w-[100px] h-[20px] rounded-full" /></li>
            <li><Skeleton className="w-[100px] h-[20px] rounded-full" /></li>
            <li><Skeleton className="w-[100px] h-[20px] rounded-full" /></li>
        </ul>
   </div>
   </div>
    </>
  )
}
