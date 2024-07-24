export const Skeleton = () => (
    <div className="w-full h-full animate-pulse">
      <div className="flex flex-col">
        <div className="w-full aspect-square bg-gray-300" />
        <div className="p-5">
          <div className="flex items-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gray-300" />
            <div className="ml-4">
              <div className="w-24 h-6 bg-gray-300 mb-2" />
              <div className="w-32 h-6 bg-gray-300" />
            </div>
          </div>
          <div>
            <div className="w-48 h-8 bg-gray-300 mb-2" />
            <div className="w-32 h-6 bg-gray-300 mb-4" />
            <div className="w-full h-4 bg-gray-300" />
            <div className="w-full h-4 bg-gray-300 mt-2" />
            <div className="w-full h-4 bg-gray-300 mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
  