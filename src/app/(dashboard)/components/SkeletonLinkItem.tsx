const SkeletonLinkItem = () => (
  <li className="p-5 bg-[#fafafa] border-gray-100 border rounded-xl animate-pulse">
    <div className="flex justify-between items-center mb-3">
      <span className="text-base font-bold bg-gray-300 rounded w-24 h-5"></span>
      <div className="flex items-center gap-2">
        <span className="text-primary flex items-center gap-1 text-base bg-gray-300 rounded w-12 h-5"></span>
        <span className="text-red-500 flex items-center gap-1 text-base bg-gray-300 rounded w-16 h-5"></span>
      </div>
    </div>
    <label className="flex flex-col text-[12px] bg-gray-300 rounded w-16 h-3 mb-1"></label>
    <div className="relative mb-3 mt-1 bg-gray-300 rounded h-8"></div>
    <label className="flex flex-col text-[12px] bg-gray-300 rounded w-16 h-3 mb-1"></label>
    <div className="relative mt-1 bg-gray-300 rounded h-8"></div>
  </li>
);

export default SkeletonLinkItem;
