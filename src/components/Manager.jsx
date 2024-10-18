import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setpasswordArray(passwords);
  };
  useEffect(() => {
    getPasswords();
  }, []);

  const passwordRef = useRef();
  const ref = useRef();
  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };
  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      // If any such id exists in the db, delete it
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      setform({ site: "", username: "", password: "" });
      toast("Saved!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: Password not saved", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletePassword = async (id) => {
    let c = confirm("Do you want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id != id));
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      toast("Deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    setform({...passwordArray.filter((i) => i.id === id)[0], id:id});
    setpasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const handleChange = (e) => [
    setform({ ...form, [e.target.name]: e.target.value }),
  ];

  const copyText = (text) => {
    toast("Copied to Clipboard!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="md:mycontainer w-full min-h-[81.5vh]   max-w-4xl">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          <span className="text-white">Pass</span>
          <span className="text-green-500">Man/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Manage all your passwords at one place!
        </p>
        <div className="flex flex-col py-4 text-white">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-green-800 text-black  w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
            placeholder="Enter Website URL"
          />
        </div>
        <div className="flex gap-2 w-full">
          <input
            value={form.username}
            onChange={handleChange}
            className="rounded-full border border-green-800  text-black w-full p-4 py-1"
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
          />
          <div className="relative">
            <input
              ref={passwordRef}
              value={form.password}
              onChange={handleChange}
              className="rounded-full border border-green-800 text-black  w-full p-4 py-1"
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
            />
            <span
              className="absolute right-1 top-1.5 cursor-pointer "
              onClick={showPassword}
            >
              <img ref={ref} width={20} src="icons/eye.png" alt="eye" />
            </span>
          </div>
        </div>
        <button
          onClick={savePassword}
          className=" flex mx-auto my-2 gap-1 justify-center items-center bg-green-400 text-black font-bold hover:font-extrabold hover:bg-green-500 px-3 p-1 rounded-full"
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
          ></lord-icon>
          Save
        </button>
        <div className="passwords m-5">
          <h2 className="text-white text-xl mx-auto font-bold text-center py-2">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-white"> No Passwords to show </div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-700 text-white py-2 border border-green-700">
                <tr>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-2 border border-green-300 text-center w-20">
                        <div className="flex items-center justify-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "20px",
                                height: "20px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 border border-green-300 text-center w-20">
                        <div className="flex items-center justify-center ">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "20px",
                                height: "20px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 border border-green-300 text-center w-20">
                        <div className="flex items-center justify-center ">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "20px",
                                height: "20px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>{" "}
                      </td>
                      <td className="px-2 border border-green-300 text-center w-20">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
