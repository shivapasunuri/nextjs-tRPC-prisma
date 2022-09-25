import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

interface User {
  id: number;
  name: string;
  email: string;
}

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [allUsers, setAllUsers] = useState<Array<User>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<User>({
    id: -1,
    name: "",
    email: "",
  });

  const createUser = trpc.useMutation(["create-user"]);
  const allData = trpc.useQuery(["all-users"]);
  useEffect(() => {
    try {
      setAllUsers(allData.data!);
    } catch (err) {
      console.log(err);
    }
  }, [allData.data]);

  const createUserHandler = (): void => {
    createUser.mutate({ email: email, name: name });
    window.location.reload();
  };

  const deleteUserById = trpc.useMutation(["delete-user"]);

  const deleteUser = (userId: number): void => {
    deleteUserById.mutate({ userId: userId });
    window.location.reload();
  };

  const handleEditClick = (id: number, name: string, email: string): void => {
    setShowModal(true);
    setUserSelected({ id: id, name: name, email: email });
  };

  const updateUser = trpc.useMutation(["update-user"]);
  const handleEdit = () => {
    updateUser.mutate({
      id: userSelected.id,
      email: userSelected.email,
      name: userSelected.name,
    });
    window.location.reload();
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-blue-500">
        NextJs tRPC Prisma Boilerplate
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
          className="inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Create User
        </button>
      </div>
      <>
        <div
          className="w-1/2 mx-96 flex flex-col justify-center items-center"
          // style={{ marginLeft: "34rem" }}
        >
          {allUsers.map((user) => {
            return (
              <div
                key={user.id}
                className="flex flex-col w-full h-24 m-2 p-4 border border-solid border-gray-300 rounded"
              >
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold text-2xl">{user.name}</h1>
                  <div className="grid gap-2 grid-flow-col justify-end">
                    <button
                      onClick={() =>
                        handleEditClick(user.id, user.name, user.email)
                      }
                      className="flex p-2.5 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="flex p-2.5 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="tracking-wider text-gray-500 md:text-lg dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            );
          })}
        </div>
      </>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Edit User</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Username
                    </label>
                    <input
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setUserSelected({
                          ...userSelected,
                          name: e.target.value,
                        });
                      }}
                      value={userSelected?.name}
                      type="text"
                      name="username"
                      id="username"
                      className="form-control block mb-2 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"
                      placeholder="User name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      User Email
                    </label>
                    <input
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setUserSelected({
                          ...userSelected,
                          email: e.target.value,
                        });
                      }}
                      value={userSelected?.email}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="user@mail.com"
                      className="form-control block mb-2 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-grey-500 background-transparent font-medium uppercase px-6 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    type="button"
                    onClick={() => handleEdit()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Home;
