
import { useEffect, useState } from 'react'
import './App.scss'
// import CardButton from './components/CardButton/CardButton'
import Header from './components/Header/Header'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalForm from './components/JournalForm/JournalForm'
// import JournalItem from './components/JournalItem/JournalItem'
import JournalList from './components/JournalList/JournalList'
import Body from './layouts/Body/Body'
import LeftPanel from './layouts/LeftPanel/LeftPanel'

// const INITIAL_DATA = [
//   {
//     text: 'Подготовка к обновлению курсов',
//     title: 'Горные походы открывают удивительные природные ландшафты',
//     date: new Date(),
//     id: 1
//   },
//   {
//     text: 'Поход в горы',
//     title: 'Думал, что очень много времени',
//     date: new Date(),
//     id: 2
//   }
// ];

function App() {
  const [ items, setItems ] = useState([]);

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('data'));

    if(data) {
      setItems(data.map(item => ({
        ...item,
        date: new Date(item.date),
      })));
    }
  }, [])
  useEffect(()=> {
    if(items.length){
      console.log('запись')
      localStorage.setItem('data', JSON.stringify(items));
      // localStorage.removeItem('data');
    }
  }, [items])

  

  const addItem = item => {
    setItems(oldItems => [ ...oldItems, {
      text: item.text,
      title: item.title,
      date: new Date(item.date),
      id: Math.max(...oldItems.map(i => i.id)) + 1
    } ]);
  };

  return (
    <div className='app'>
      <LeftPanel>
        <Header />
        <JournalAddButton/>
        <JournalList items={items} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem}/>
      </Body>
    </div>
  )
}

export default App
