import React, { useState, useContext } from 'react';
import Form from './Form';
import Note from './Note';
import { DataContext } from '../../Context/DataProvider';
import { Box, Typography, Container, Grid, TextField, Button } from '@mui/material';
import { LightbulbOutlined } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Notes = () => {
  const { notes, setNotes } = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [showReminders, setShowReminders] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination)
      return;

    const items = reorder(notes, result.source.index, result.destination.index);
    setNotes(items);
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowReminders = () => {
    setShowReminders(!showReminders);
  };

  const handleAddNote = (title, text) => {
    const newNote = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      text,
      dueDate: null,
      backgroundColor: getRandomColor(), // generate new random color for each note
    };
    setNotes([...notes, newNote]);
  };
  const filteredNotes = showReminders
    ? notes.filter((note) => note.dueDate && new Date(note.dueDate) > new Date())
    : notes.filter((note) => {
      return note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.text.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <React.Fragment>
      <Box sx={{ marginBottom: '1rem' }}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={8} lg={9}>
            <TextField
              fullWidth
              id="search"
              label="Search"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} textAlign="right">
            <Button variant="contained" onClick={handleShowReminders}>
              {showReminders ? 'Show All' : 'Reminders'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Form onAddNote={handleAddNote} />

      {
        filteredNotes.length === 0 ? (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '5rem',
          }}>
            <LightbulbOutlined sx={{
              backgroundSize: '120px 120px',
              height: '120px',
              margin: '20px',
              opacity: '.1',
              width: '120px',
            }} />
            <Typography sx={{ fontSize: '1.375rem' }} align='center' variant="h6" color="#5f6368">
              Notes you add appear here
            </Typography>
          </Box>
        ) :
          (
            <Container maxWidth="lg">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <Grid spacing={2} container
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {
                        filteredNotes.map((note, index) => (
                          <Draggable key={note.id} draggableId={note.id} index={index}>
                            {(provided) => (
                              <Grid item xs={12} sm={6} md={4} lg={3}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Note note={note} backgroundColor={note.backgroundColor} />
                              </Grid>
                            )}
                          </Draggable>
                        ))
                      }
                    </Grid>
                  )}
                </Droppable>
              </DragDropContext>
            </Container>
          )
      }
    </React.Fragment>
  )
}

export default Notes;