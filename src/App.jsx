
import { useState } from 'react'
import './App.scss'
// import CardButton from './components/CardButton/CardButton'
import Header from './components/Header/Header'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalForm from './components/JournalForm/JournalForm'
// import JournalItem from './components/JournalItem/JournalItem'
import JournalList from './components/JournalList/JournalList'
import Body from './layouts/Body/Body'
import LeftPanel from './layouts/LeftPanel/LeftPanel'

const INITIAL_DATA = [
    // {
    //   id: 1,
    //   title: 'Подготовка обновления курсов',
    //   text: 'Горные походы открывают удивительные природные ландшафты',
    //   date: new Date()
    // },
    // {
    //   id: 2,
    //   title: 'Поход в горы',
    //   text: 'Думал, что очень много времени',
    //   date: new Date(),
    // }
  ];

function App() {
  const [ items, setItems ] = useState(INITIAL_DATA);

  

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
