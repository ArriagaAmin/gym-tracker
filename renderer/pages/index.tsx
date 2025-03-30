import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { getAllUsers } from "@services";
import { UserDTO } from "@objects";
import { exec } from "child_process";

export default function HomePage() {
  const router = useRouter();

  const [path, setPath] = useState("");
  const [users, setUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    const afunction = async () => {
      const response = await getAllUsers();

      if (!response.error && response.data) {
        setUsers(response.data);
      }
    };

    afunction();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Gym Tracker - Home</title>
      </Head>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <div>
          <Image
            className="ml-auto mr-auto"
            src="/images/logo.png"
            alt="Logo image"
            width={256}
            height={256}
          />
        </div>
        <span>⚡ Electron ⚡</span>
        <span>+</span>
        <span>Next.js</span>
        <span>+</span>
        <span>tailwindcss</span>
        <span>=</span>
        <span>💕 </span>
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <button onClick={() => router.push("/example")}>NEXT PAGE</button>
      </div>


      {users.map((user) => (
        <div key={user.id}>
          {user.name}
        </div>
      ))}
    </React.Fragment>
  );
}
