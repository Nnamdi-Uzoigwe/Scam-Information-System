export default function LoadingState() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6 animate-pulse">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-3 h-5 w-5 bg-gray-200 rounded-full"></div>
                            <div className="flex-1 space-y-3">
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                              <div className="h-3 bg-gray-200 rounded w-full"></div>
                              <div className="h-3 bg-gray-200 rounded w-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
         </div>
    )
}