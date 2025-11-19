// src/components/EmailDetail.tsx
import React from "react";
import { Box, Heading, Text, Button, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEmail } from "../hooks/useEmail";
import { useSuggestReply } from "../hooks/useSuggestReply";
import SuggestReplyModal from "./SuggestReplyModal";

const EmailDetail: React.FC = () => {
  const { id } = useParams();
  console.log("📧 EmailDetail → id from route:", id);

  const { data: email, isLoading, error } = useEmail(id!);
  const suggest = useSuggestReply();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [reply, setReply] = React.useState("");

  if (isLoading) {
    console.log("📧 EmailDetail → Loading...");
    return <Spinner />;
  }

  if (error) {
    console.error("🚨 EmailDetail → Error:", error);
    return <Text color="red.500">Failed to load email.</Text>;
  }

  if (!email) {
    console.warn("📧 EmailDetail → No email found for id:", id);
    return <Text>No email found.</Text>;
  }

  const handleSuggest = async () => {
    console.log("🤖 EmailDetail → SuggestReply for id:", id);
    const r = await suggest.mutateAsync(id!);
    console.log("🤖 EmailDetail → Suggested reply:", r);
    setReply(r);
    setModalOpen(true);
  };

  return (
    <Box p="6">
      <Heading size="lg" mb="3">
        {email.subject}
      </Heading>
      <Text mb="1">From: {email.from}</Text>
      <Text fontSize="sm" mb="4">
        {new Date(email.date).toLocaleString()}
      </Text>
      <Text whiteSpace="pre-wrap" mb="4">
        {email.body}
      </Text>

      <Button
        colorScheme="blue"
        onClick={handleSuggest}
        isLoading={suggest.isLoading}
      >
        Suggest Reply
      </Button>

      <SuggestReplyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        reply={reply}
      />
    </Box>
  );
};

export default EmailDetail;
