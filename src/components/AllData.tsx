import { useState } from "react";
import {
  Avatar,
  Group,
  Button,
  Stack,
  Center,
  Accordion,
  Table,
  Loader,
} from "@mantine/core";
import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";

const getInitials = (name: string) => {
  if (!name) return "";

  const nameParts = name.trim().split(" ");

  if (nameParts.length > 1) {
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[1].charAt(0).toUpperCase()
    );
  }

  return nameParts[0].charAt(0).toUpperCase();
};

export const AllData = () => {
  const [currentUser] = useAuthState(auth);
  const [value, loading] = useCollectionData(collection(db, "users"));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedUsers = value?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const usersList = paginatedUsers?.map((data: any, i: number) => {
    const initials = getInitials(data.name);

    const transactionHistory = data.history.map((hist: any, i: number) => {
      let style: object;
      if (hist.type === "deposit") {
        style = { color: "green" };
      } else {
        style = { color: "red" };
      }

      return (
        <tr key={i} style={style}>
          <td style={{ textAlign: "center" }}>{hist.type.toUpperCase()}</td>
          <td style={{ textAlign: "center" }}>${hist.newBalance}</td>
          <td style={{ textAlign: "center" }}>{hist.createdAt}</td>
        </tr>
      );
    });

    return (
      <Accordion.Item value={data.name} key={data.uid}>
        <Accordion.Control>
          <Group align="center">
            <Avatar
              radius="xl"
              size="lg"
              alt={data.name || "User Avatar"}
              sx={{
                backgroundColor: "#e0f7fa",
                border: "2px solid #00838f",
                color: "#00838f",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {initials}
            </Avatar>
            <h3 style={{ fontSize: "20px", margin: 0, lineHeight: "1.5" }}>
              {data.name}{" "}
              {data.uid === currentUser?.uid ? (
                <span style={{ color: "green" }}>- Current User</span>
              ) : (
                ""
              )}
            </h3>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <>
            <h5>Current Balance: ${data.balance}</h5>
            <br />
            <h6>Name: {data.name}</h6>
            <h6>Email: {data.email}</h6>
            <h6>Password: {data.password}</h6>
            <br />
            <p style={{ textAlign: "center" }}>
              <strong>Transaction History:</strong>
            </p>
            <br />
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Transaction Type</th>
                  <th style={{ textAlign: "center" }}>New Balance</th>
                  <th style={{ textAlign: "center" }}>Date and Time</th>
                </tr>
              </thead>
              <tbody>{transactionHistory}</tbody>
            </Table>
          </>
        </Accordion.Panel>
      </Accordion.Item>
    );
  });

  if (loading) {
    return (
      <Center style={{ marginTop: "5em" }}>
        <Loader color="dark" size="xl" variant="bars" />
      </Center>
    );
  }

  const totalPages = Math.ceil((value?.length || 0) / itemsPerPage);

  return (
    <Stack align="center" style={{ paddingTop: "5em" }}>
      <h1 style={{ paddingBottom: "0.5em" }}>All Data</h1>
      <Accordion
        style={{ width: "75%" }}
        variant="separated"
        defaultValue="userData"
        radius="xs"
      >
        {usersList}
      </Accordion>

      {/* Pagination Controls */}
      <Group mt="lg" position="center">
        <Button
          variant="outline"
          color="teal"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          color="teal"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </Button>
      </Group>
    </Stack>
  );
};
