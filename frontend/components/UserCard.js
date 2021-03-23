import React from "react";
import { Card, Text } from "react-native-elements";

const UserCard = props => {
  const { user, children } = props;
  return (
    <Card>
      <Card.Title>{user.username}</Card.Title>
      <Text>{user.biography}</Text>
      {children}
      <Text>Tags: </Text>
      {user.tags.map(tag => (
        <Text key={tag.id}>{tag.name}</Text>
      ))}
    </Card>
  );
};

export default UserCard;
