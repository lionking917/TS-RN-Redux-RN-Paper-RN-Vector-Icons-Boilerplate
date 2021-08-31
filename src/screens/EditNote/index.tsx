import React, { useLayoutEffect, useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { EditNoteScreenProps, EditNoteScreenRouteProps, Note, Theme } from '../../types/interfaces';

import { addNote, updateNote } from '../../redux/actions';
import styles from './styles';

interface FormValues {
  title: string;
  body: string;
}

const NoteSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
  body: Yup.string().min(2, 'Too Short!').max(200, 'Too Long!').required('Required'),
});

const EditNoteScreen = () => {
  const navigation = useNavigation<EditNoteScreenProps>();
  const route = useRoute<EditNoteScreenRouteProps>();
  const dispatch = useDispatch();
  const { colors } = useTheme() as Theme;
  const [note, setNote] = useState<Note>({});
  const id = route.params.id;

  const notesReducer = useSelector((state: any) => state.notesReducer);

  const { touched, errors, setFieldValue, handleChange, handleBlur, handleSubmit, values } =
    useFormik({
      initialValues: { title: '', body: '' },
      validationSchema: NoteSchema,
      onSubmit: (values: FormValues) => {
        if (id) {
          const newNote = {
            id: id,
            title: values.title,
            body: values.body,
          };
          dispatch(updateNote(newNote));
        } else {
          dispatch(addNote(values));
        }
        navigation.goBack();
      },
    });

  useEffect(() => {
    if (id) {
      const tmp: Note = notesReducer.notes.find((item: Note) => item.id === id);
      setFieldValue('title', tmp.title);
      setFieldValue('body', tmp.body);

      setNote(note);
    }
  }, [id, note, notesReducer.notes, setFieldValue]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Edit Note',
      headerTintColor: colors.textColor1,
      headerStyle: {
        backgroundColor: colors.background3,
      },
    });
  }, [navigation, colors.textColor1, colors.background3]);

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={styles.section}>
        <TextInput
          label="title"
          value={values.title}
          style={{ backgroundColor: colors.background2 }}
          onChangeText={handleChange('title')}
          onBlur={handleBlur('title')}
        />
        {errors.title && touched.title ? <Text style={styles.error}>{errors.title}</Text> : null}
      </View>
      <View style={styles.section}>
        <TextInput
          label="body"
          value={values.body}
          style={{ backgroundColor: colors.background2 }}
          onChangeText={handleChange('body')}
          onBlur={handleBlur('body')}
        />
        {errors.body && touched.body ? <Text style={styles.error}>{errors.body}</Text> : null}
      </View>
      <Button mode="contained" color="black" onPress={handleSubmit}>
        {id ? 'UPDATE' : 'SAVE'}
      </Button>
    </SafeAreaView>
  );
};

export default EditNoteScreen;
