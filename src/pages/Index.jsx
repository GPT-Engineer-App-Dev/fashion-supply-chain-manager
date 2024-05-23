import { useState } from "react";
import { Container, VStack, HStack, Text, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const toast = useToast();

  const handleAddItem = () => {
    if (itemName === "" || quantity === "") {
      toast({
        title: "Error",
        description: "Item name and quantity are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newItem = { itemName, quantity: parseInt(quantity) };
    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    setItemName("");
    setQuantity("");
  };

  const handleEditItem = (index) => {
    setItemName(items[index].itemName);
    setQuantity(items[index].quantity);
    setEditIndex(index);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">
          Inventory Management
        </Text>
        <HStack width="100%">
          <Input placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
          <Input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <Button onClick={handleAddItem}>{editIndex !== null ? "Update" : "Add"}</Button>
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Item Name</Th>
              <Th>Quantity</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, index) => (
              <Tr key={index}>
                <Td>{item.itemName}</Td>
                <Td>{item.quantity}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEditItem(index)} />
                    <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDeleteItem(index)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;
