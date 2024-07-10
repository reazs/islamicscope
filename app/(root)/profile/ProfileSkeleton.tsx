
const ProfileSkeleton = () => {
  return (
    <div className="mt-10">
      <div className="mt-10">
        <div className="flex justify-between items-center mt-5">
          <div className="w-[40px] h-[40px] flex items-center">
            <div className="w-[40px] h-[40px] bg-gray-300 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
        <h3 className="text-2xl text-zinc-400 font-bold font-josefin-sans my-5">
          Posts
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="h-[100px] bg-gray-300 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton