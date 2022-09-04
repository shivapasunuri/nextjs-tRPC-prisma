import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

interface AllUsers {
  id: number;
  name: string;
  email: string;
}

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [allUsers, setAllUsers] = useState<AllUsers[]>([]);

  const hello = trpc.useQuery([
    "hello",
    { text: "NextJs Prisma tRPC TailWindCSS Boilerplate" },
  ]);
  if (hello.isLoading) return <div>Loading...</div>;

  const createUser = trpc.useMutation(["create-user"]);

  const allData = trpc.useQuery(["all-users"]);
  useEffect(() => {
    if (allData.data) setAllUsers(allData.data);
  }, [allData]);

  const createUserHandler = (): void => {
    createUser.mutate({ email: email, name: name });
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-blue-500">
        {hello.data?.greeting}
      </h1>
      <div className="flex justify-center items-center">
        <form action="">
          <div className="m-2">
            <label
              className="form-label inline-block mb-1 text-center"
              htmlFor="name"
            >
              Name
            </label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              value={name}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"
              type="text"
              name=""
              id="name"
              placeholder="Name"
            />
          </div>
          <div className="m-2">
            <label
              className="form-label inline-block mb-1 text-center"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              value={email}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"
              type="email"
              name=""
              id="email"
              placeholder="Email"
            />
          </div>
        </form>
      </div>
      <div className="flex space-x-2 justify-center">
        <button
          onClick={createUserHandler}
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className="inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Create User
        </button>
      </div>
      <div className="ml-96" style={{ marginLeft: "34rem" }}>
        <div className="flex flex-col w-96">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-6 py-4 text-left"
                      >
                        Id
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-6 py-4 text-left"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-6 py-4 text-left"
                      >
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((user) => {
                      return (
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.id}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {user.name}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {user.email}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
