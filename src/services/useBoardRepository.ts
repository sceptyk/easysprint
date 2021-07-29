import firebase from 'firebase/app'
import { Ref, ref } from 'vue';
import { Board } from '../types/Board';
import { BoardItem } from '../types/BoardItem';

export const useBoardRepository = () => {
  const db = firebase.firestore();

  const fetchBoards = (userId: string) => {
    const list: Ref<Board[]> = ref([]);
    db.collection('users').doc(userId).collection('boards').orderBy('updatedAt', 'desc').onSnapshot(snapshot => {
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
      item.value = {
        id: doc.id,
        ...doc.data()
      } as Board
    })

    return item;
  }

  const fetchBoardItems = (id: string) => {
    const list: Ref<BoardItem[]> = ref([]);

    db.collection('boards').doc(id).collection('items').onSnapshot(snapshot => {
      const results: BoardItem[] = [];
      snapshot.forEach(doc => {
        results.push({
          id: doc.id,
          ...doc.data()
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

  const removeBoardItem = (boardId: string, itemId: string) => {
    return db.collection('boards').doc(boardId).collection('items').doc(itemId).delete();
  }

  const createBoard = async (data: Partial<Board>) => {
    const board = {
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const { id } = await db.collection('boards').add(board);
    await db.collection('users').doc(data.owner).collection('boards').doc(id).set(board);
  }

  const updateBoard = (boardId: string, data: Partial<Board>) => {
    return db.collection('boards').doc(boardId).update({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  const removeBoard = (userId: string, boardId: string) => {
    return Promise.all([
      db.collection('boards').doc(boardId).delete(),
      db.collection('users').doc(userId).collection('boards').doc(boardId).delete(),
    ]);
  }

  return {
    fetchBoards,
    fetchBoard,
    fetchBoardItems,
    createBoardItem,
    removeBoardItem,
    createBoard,
    updateBoard,
    removeBoard,
  }
}