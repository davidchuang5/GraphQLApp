import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
interface addBookProps {
  mutation: any;
}
export function AddBook({ mutation }: addBookProps) {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [addMutate] = useMutation(mutation);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await addMutate({
        variables: {
          name,
          genre,
          author,
        },
      });

      setName('');
      setGenre('');
      setAuthor('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input style={{ color: 'blue' }} value={name} onChange={(e) => setName(e.target.value)} />

      <input style={{ color: 'blue' }} value={genre} onChange={(e) => setGenre(e.target.value)} />

      <input style={{ color: 'blue' }} value={author} onChange={(e) => setAuthor(e.target.value)} />

      <button onClick={handleSubmit}>Add Book</button>
    </div>
  );
}
