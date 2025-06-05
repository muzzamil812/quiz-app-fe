import Link from "next/link";

type StacksResponse = {
  id: number;
  name: string;
  description: string;
  status: string;
  datetime: string;
  modifiedDatetime: string;
}[];

async function Stacks() {
  const url = process.env.API_SERVER_URL + "/stacks/all";
  if (!url) {
    throw new Error("API server URL is not defined");
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch stacks");
  }
  const data = await response.json();
  const stacks: StacksResponse = data.data;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {stacks.map((stack) => (
        <Link
          href={`/stacks/${stack.id}`}
          key={stack.id}
          className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          {/* Image or placeholder */}
          <div className="h-40 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image Placeholder</span>
          </div>

          {/* Card content */}
          <div className="p-5">
            <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {stack.name}
            </h2>
            <p className="text-gray-600 mt-1 line-clamp-2">{stack.description}</p>

            {/* Status badge */}
            <span
              className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${stack.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
                }`}
            >
              {stack.status}
            </span>

            {/* Meta info */}
            <div className="mt-4 text-xs text-gray-400 space-y-1">
              <p>Created: {new Date(stack.datetime).toLocaleString()}</p>
              <p>Modified: {new Date(stack.modifiedDatetime).toLocaleString()}</p>
            </div>

            {/* View Button */}
            <div className="mt-4">
              <span className="inline-block text-sm text-blue-600 font-medium group-hover:underline">
                View Details →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Stacks