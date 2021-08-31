import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { DrawerActions, useIsFocused, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, Card, Paragraph, Text, useTheme } from 'react-native-paper';

import { AllNotesScreenProps, Note, Theme } from '../../types/interfaces';
import { archiveNote, favoriteNote, unArchiveNote, unFavoriteNote } from '../../redux/actions';
import styles from './styles';

const AllNotesScreen = () => {
  const navigation = useNavigation<AllNotesScreenProps>();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { colors } = useTheme() as Theme;
  const [notes, setNotes] = useState<Note[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  const notesReducer = useSelector((state: any) => state.notesReducer);

  useEffect(() => {
    let newNotes: Note[] = notesReducer.notes;

    if (tabIndex === 0) {
      newNotes = newNotes.filter((item: Note) => !item.is_archived && !item.is_favorite);
    } else if (tabIndex === 1) {
      newNotes = newNotes.filter((item: Note) => item.is_archived);
    } else {
      newNotes = newNotes.filter((item: Note) => item.is_favorite);
    }

    setNotes(newNotes);
  }, [navigation, notesReducer.notes, tabIndex, isFocused]);

  useEffect(() => {
    setTabIndex(navigation.getState().index);
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        tabIndex === 0 ? 'All Notes' : tabIndex === 1 ? 'Archived Notes' : 'Favorite Notes',
      headerTintColor: colors.textColor1,
      headerLeft: () => {
        const toggleMenu = () => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        };
        return (
          <Button onPress={toggleMenu}>
            <Icon name="menu" size={30} color={colors.iconColor} />
          </Button>
        );
      },
      headerRight: () => {
        const goToNote = () => {
          navigation.navigate('EditNote', {});
        };
        return (
          tabIndex === 0 && (
            <Button onPress={goToNote} color={colors.textColor1}>
              ADD
            </Button>
          )
        );
      },
      headerStyle: {
        backgroundColor: colors.background3,
      },
    });
  }, [navigation, tabIndex, colors.textColor1, colors.iconColor, colors.background3]);

  const editNote = (id?: number) => {
    navigation.push('EditNote', { id: id });
  };

  const handleArchive = (id: number) => {
    dispatch(archiveNote(id));
  };

  const handleFavorite = (id: number) => {
    dispatch(favoriteNote(id));
  };

  const handleUnArchive = (id: number) => {
    dispatch(unArchiveNote(id));
  };

  const handleUnFavorite = (id: number) => {
    dispatch(unFavoriteNote(id));
  };

  const timeConverter = (timestamp: number) => {
    var a = new Date(timestamp);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView>
        {notes &&
          notes.map((note: Note, index: number) => {
            return (
              <Card
                key={index}
                style={{ ...styles.card, backgroundColor: colors.background2 }}
                onPress={() => editNote(note.id)}>
                <Card.Title title={note.title} />
                <Card.Content>
                  <Text style={styles.body}>{note.body}</Text>
                  <Paragraph>Create At: {timeConverter(note.created_at || 0)}</Paragraph>
                  <Paragraph>Updated At: {timeConverter(note.updated_at || 0)}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  {tabIndex === 0 ? (
                    <>
                      <Button onPress={() => handleArchive(note.id || 0)}>Archive</Button>
                      <Button onPress={() => handleFavorite(note.id || 0)}>Favorite</Button>
                    </>
                  ) : tabIndex === 1 ? (
                    <Button onPress={() => handleUnArchive(note.id || 0)}>UnArchive</Button>
                  ) : (
                    <Button onPress={() => handleUnFavorite(note.id || 0)}>UnFavorite</Button>
                  )}
                </Card.Actions>
              </Card>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllNotesScreen;
