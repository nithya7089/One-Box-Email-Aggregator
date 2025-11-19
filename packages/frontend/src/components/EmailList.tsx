// src/components/EmailList.tsx
import React from "react";
import { Box, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEmails } from "../hooks/useEmails";

const EmailList: React.FC = () => {
  console.log("📄 EmailList → Render");

  const navigate = useNavigate();
  const { data: emails = [], isLoading, error } = useEmails();

  console.log("📄 EmailList → Hook state:", { isLoading, error, emails });

  if (isLoading) {
    console.log("📄 EmailList → Loading spinner");
    return <Spinner m="auto" />;
  }

  if (error) {
    console.error("🚨 EmailList → Error state:", error);
    return <Text color="red.500">Failed to load emails.</Text>;
  }

  if (!emails || emails.length === 0) {
    console.warn("📄 EmailList → No emails to show");
    return <Text>No emails found.</Text>;
  }

  return (
    <Box p="4">
      <List spacing="3">
        {emails.map((email: any) => (
          <ListItem
            key={email.id}
            cursor="pointer"
            onClick={() => {
              console.log("🖱 EmailList → Click email id:", email.id);
              navigate(`/email/${email.id}`);
            }}
            p="2"
            _hover={{ bg: "gray.100" }}
          >
            <Text fontWeight="bold">{email.subject}</Text>
            <Text fontSize="sm">{email.date}</Text>
            <Text fontSize="sm">{email.from}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EmailList;
