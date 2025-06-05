
type Props = {
  params: Promise<{
    id: number;
  }>;
};

type StackData = {
  id: number;
  name: string;
  description: string;
  status: string;
  datetime: string;
  modifiedDatetime: string;
};

async function Stack({ params }: Props) {
  const { id } = await params;
  const url = process.env.API_SERVER_URL + "/stacks/getStackByID/" + id;
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
    throw new Error("Failed to fetch stack");
  }
  const data = await response.json();
  const stackData: StackData = data.data;
  return (
    <div className="max-w-xl mx-auto mt-5 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Stack Details</h1>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold text-gray-900">ID:</span> {stackData.id}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Name:</span> {stackData.name}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Description:</span> {stackData.description}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Status:</span> {stackData.status}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Created At:</span> {new Date(stackData.datetime).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Modified At:</span> {new Date(stackData.modifiedDatetime).toLocaleString()}
        </p>
      </div>
    </div>

  )
}

export default Stack