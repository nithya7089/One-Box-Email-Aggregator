// src/components/Sidebar.tsx
import React from "react";
import { Box, VStack, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const gmailLabels = [
  "INBOX",
  "STARRED",
  "SENT",
  "DRAFT",
  "IMPORTANT",
  "TRASH",
  "CATEGORY_PROMOTIONS",
  "CATEGORY_UPDATES",
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  console.log("📚 Sidebar → Render");

  return (
    <Box w="250px" bg="gray.50" p="4" overflowY="auto">
      <Heading size="md" mb="4">
        Gmail Labels
      </Heading>

      <VStack align="start" spacing="2">
        {gmailLabels.map((label) => (
          <Button
            key={label}
            variant="ghost"
            justifyContent="flex-start"
            width="100%"
            onClick={() => {
              console.log("🖱 Sidebar → Click label:", label);
              navigate("/", { state: { label } });
            }}
          >
            {label}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
