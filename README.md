# OOZOU TEST PROJECT(TypeScript + React Native + React Native Paper + React Native Vector Icons + Redux Thunk)

## Unzip file to extract source files
## Initializing

```sh
cd oozou
npm install(or yarn)
npx react-native run-android(or yarn react-native run-android)
```

## Cautions

Since we are using [react-native-vector-icons/MaterialIcons](https://www.npmjs.com/package/react-native-vector-icons), please be careful if this package is installed correctly.
* You can refer this documentation [installation guide in detail](https://www.npmjs.com/package/react-native-vector-icons)

## User guides

We have following pages/components in our app.
* Drawer Menu (**Main Bottom Tabs Page**, **Settings Page**)
* Bottom Tabs (**All Notes Page**, **Favorite Notes Page**, **Archived Notes Page**)

In **Settings Page**, you can toggle theme(light/dark modes). 
In **All Notes Page**, we list all added(no archive, no favorite) notes. Also you can add new note.
In **Favorite Notes Page**, we list all notes that user added to favorite. You can also unfavorite note.
In **Archived Notes Page**, we list all notes that user already archived. You can also unarchive note.
By clicking each note, you can go to update note page.

## Techniques
* We are using [react-native-paper](https://www.npmjs.com/package/react-native-paper) to show elements.
* We are using [redux-persist](https://www.npmjs.com/package/redux-persist) to store reducer data permanently.
* We are using [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons) to show icons.