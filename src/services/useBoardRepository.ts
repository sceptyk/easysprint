import firebase from 'firebase/app'
import { Ref, ref } from 'vue';
import { Board } from '../types/Board';
import { BoardItem } from '../types/BoardItem';

export const useBoardRepository = () => {

  const db = firebase.firestore();

  const fetchBoards = () => {
    const list: Ref<Board[]> = ref([]);
    db.collection('boards').orderBy('updatedAt', 'desc').onSnapshot(snapshot => {
      const results: Board[] = [];
      snapshot.forEach(doc => {
        const { title, updatedAt } = doc.data();
        results.push({
          id: doc.id,
          title,
          updatedAt: updatedAt?.toDate()
        } as Board)
      })
      list.value = results;
    })
    return list;
  }

  const fetchBoard = (id: string) => {
    const item: Ref<Board | undefined> = ref();
    db.collection('boards').doc(id).onSnapshot(doc => {
      const { title } = doc.data() as any;
      item.value = {
        id: doc.id,
        title,
      } as Board
    })

    return item;
  }

  const fetchBoardItems = (id: string) => {
    const list: Ref<BoardItem[]> = ref([]);

    db.collection('boards').doc(id).collection('items').onSnapshot(snapshot => {
      const results: BoardItem[] = [];
      snapshot.forEach(doc => {
        const { content, column } = doc.data();
        results.push({
          id: doc.id,
          content,
          column
        } as BoardItem)
      })
      list.value = results;
    })

    return list;
  }

  const createBoardItem = (boardId: string, data: Partial<BoardItem>) => {
    return db.collection('boards').doc(boardId).collection('items').add({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  const createBoard = () => {
    return db.collection('boards').add({
      title: 'Untitlted',
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  return {
    fetchBoards,
    fetchBoard,
    fetchBoardItems,
    createBoardItem,
    createBoard
  }
}