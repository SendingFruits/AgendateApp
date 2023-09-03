import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const EditLabel = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={handleTextChange}
          onBlur={handleToggleEdit}
          autoFocus
        />
      ) : (
        <TouchableOpacity onPress={handleToggleEdit}>
          <Text style={styles.label}>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    paddingVertical: 10,
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    flex: 1,
  },
});

export default EditLabel;